import axios, { AxiosInstance, AxiosResponse } from 'axios'
import {
  createSignupEntities,
  clientAssembleLoginResponse,
  deriveMasterKey,
  clientVerifyLogin,
  unlockKeychain,
  UnlockedKeychain,
  createProject,
  lockProject,
  UnlockedProject,
  unlockProject
} from '@chiffre/crypto'
import type {
  SignupParameters,
  LoginChallengeResponseBody,
  KeychainResponse,
  LoginResponseParameters,
  Login2FAParameters,
  LoginResponseResponseBody,
  Login2FAResponseBody,
  Project as ProjectResponse,
  CreateVaultParameters,
  CreateVaultResponse,
  FindVaultResponse,
  CreateProjectParameters,
  CreateProjectResponse,
  CookieNames
} from '@chiffre/api-types'
import SessionKeystore from 'session-keystore'
import { generateKey, encryptString, decryptString, CloakKey } from '@47ng/cloak'

const inSevenDays = () => Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days

export type Project = Omit<ProjectResponse, 'keys' | 'vaultKey'> & UnlockedProject

export default class Client {
  public projects: Project[]
  public keychain?: UnlockedKeychain
  private api: AxiosInstance
  #keystore: SessionKeystore<'keychainKey' | 'credentials'>
  #token?: string

  constructor(url: string) {
    this.api = axios.create({
      baseURL: `${url}/v1`,
      // Use cookies in the browser
      withCredentials: typeof document !== 'undefined'
    })
    if (typeof document === 'undefined') {
      // Manually inject bearer token in Node.js
      this.api.interceptors.request.use((config) => {
        if (!this.#token) {
          return config
        }
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${this.#token}`
        }
        return config
      })
    }

    this.keychain = undefined
    this.projects = []
    this.#token = undefined
    this.#keystore = new SessionKeystore({
      name: 'chiffre-client'
    })
  }

  // --

  public async signup(username: string, password: string) {
    const signupParams: SignupParameters = await createSignupEntities(
      username,
      password
    )
    const masterKey = await deriveMasterKey(
      username,
      password,
      signupParams.masterSalt
    )
    const res = await this.api.post('/auth/signup', signupParams)
    this._handleAuthToken(res)
    this.#keystore.set(
      'keychainKey',
      await decryptString(signupParams.keychainKey, masterKey),
      Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
    )
  }

  public async login(username: string, password: string) {
    const res1 = await this.api.post('/auth/login/challenge', { username })
    const challengeResponse: LoginChallengeResponseBody = res1.data
    const response = await clientAssembleLoginResponse(
      username,
      password,
      challengeResponse.srpSalt,
      challengeResponse.ephemeral
    )
    const responseParams: LoginResponseParameters = {
      userID: challengeResponse.userID,
      challengeID: challengeResponse.challengeID,
      ephemeral: response.ephemeral.public,
      proof: response.session.proof
    }
    const res2 = await this.api.post('/auth/login/response', responseParams)
    const responseBody: LoginResponseResponseBody = res2.data
    await clientVerifyLogin(
      responseBody.proof,
      response.ephemeral,
      response.session
    )
    this._handleAuthToken(res2)

    if (responseBody.masterSalt) {
      const masterKey = await deriveMasterKey(
        username,
        password,
        responseBody.masterSalt
      )
      await this._refresh(masterKey)
      return { requireTwoFactorAuthentication: false }
    } else {
      // Two factor is required
      this.#keystore.set(
        'credentials',
        [username, password].join(':'),
        Date.now() + 60 * 1000 // 1 minute, to let 2FA flow happen
      )
      return { requireTwoFactorAuthentication: true }
    }
  }

  public async verifyTwoFactorToken(token: string) {
    const credentials = this.#keystore.get('credentials')
    if (!credentials) {
      throw new Error('Session expired, please log in again')
    }
    const [username, password] = credentials.split(':')
    const body: Login2FAParameters = {
      twoFactorToken: token
    }
    const res = await this.api.post('/auth/login/2fa', body)
    const responseBody: Login2FAResponseBody = res.data
    const masterKey = await deriveMasterKey(
      username,
      password,
      responseBody.masterSalt
    )
    this.#keystore.delete('credentials')
    this._handleAuthToken(res)
    await this._refresh(masterKey)
  }

  // --

  public lock() {
    this.keychain = undefined
    this.projects = []
    this.#keystore.clear()
    // todo: Delete cookies ?
  }

  // --

  private async _refresh(masterKey: CloakKey) {
    let keychainKey: CloakKey
    // Retrieve keychain
    {
      const res = await this.api.get('/keychain')
      const responseBody: KeychainResponse = res.data
      keychainKey = await decryptString(responseBody.key, masterKey)
      this.#keystore.set('keychainKey', keychainKey, inSevenDays())
      this.keychain = await unlockKeychain(responseBody, keychainKey)
    }

    // Retrieve projects
    {
      const res = await this.api.get('/projects')
      const responseBody: ProjectResponse[] = res.data
      const projects: Project[] = []
      for (const project of responseBody) {
        const vaultKey = await decryptString(project.vaultKey, keychainKey)
        const unlockedProject = await unlockProject(project, vaultKey)
        projects.push({
          id: project.id,
          vaultID: project.vaultID,
          embedScript: project.embedScript,
          keyPair: unlockedProject.keyPair
        })
      }
      this.projects = projects
    }
  }

  // Projects --

  public async createProject(vaultID?: string): Promise<Project> {
    // We will need this for unlocking the vault key
    // make sure it's available early before starting the process
    const keychainKey = this.#keystore.get('keychainKey')
    if (!keychainKey) {
      throw new Error('Session expired, please log in again')
    }

    // Retrieve the vault key, or create one if vaultID is not specified
    let vaultKey: CloakKey
    if (!vaultID) {
      // Create a new vault
      vaultKey = generateKey()
      const encryptedVaultKey = await encryptString(vaultKey, keychainKey)
      const createVaultParams: CreateVaultParameters = {
        key: encryptedVaultKey
      }
      const res = await this.api.post('/vaults', createVaultParams)
      const responseBody: CreateVaultResponse = res.data
      vaultID = responseBody.vaultID
    } else {
      // Use an existing vault
      const res = await this.api.get(`/vaults/${vaultID}`)
      const responseBody: FindVaultResponse = res.data
      vaultKey = await decryptString(responseBody.key, keychainKey)
    }

    // Create the project and associate it with the vault
    const unlockedProject = createProject()
    const lockedProject = await lockProject(unlockedProject, vaultKey)
    const createProjectParams: CreateProjectParameters = {
      vaultID,
      publicKey: lockedProject.keys.public,
      secretKey: lockedProject.keys.secret
    }
    const res = await this.api.post('/projects', createProjectParams)
    const responseBody: CreateProjectResponse = res.data
    const project: Project = {
      id: responseBody.projectID,
      keyPair: unlockedProject.keyPair,
      vaultID,
      embedScript: responseBody.embedScript
    }
    this.projects.push(project)
    return project
  }

  public getProject(id: string) {
    return this.projects.find((p => p.id === id))
  }

  // --

  private _handleAuthToken(res: AxiosResponse) {
    if (typeof document !== 'undefined') {
      // We're in the browser, let it do its thing.
      return
    }
    const cookies: string[] = res.headers['set-cookie']
    this.#token = cookies
      .map(cookie => cookie.split(';')[0]) // Remove scope definitions
      .filter(cookie => {
        // Keep only auth cookies
        const [name] = cookie.split('=')
        return ['chiffre:jwt-claims', 'chiffre:jwt-sig'].includes(name)
      })
      .map(cookie => cookie.split('=')[1]) // Extract the values
      .join('.') // Recompose JWT
  }
}
