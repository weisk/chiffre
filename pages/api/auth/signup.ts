import nextConnect from 'next-connect'
import { NextApiResponse } from 'next'
import requireBodyParams, {
  requiredString
} from '~/src/server/middleware/requireBodyParams'
import database, { Db } from '~/src/server/middleware/database'
import { Request } from '~/src/server/types'
import { createUser } from '~/src/server/db/models/auth/UsersAuthSRP'
import { createUserAuthSettings } from '~/src/server/db/models/auth/UsersAuthSettings'
import {
  createKeychainRecord,
  KeychainRecord
} from '~/src/server/db/models/auth/Keychains'

export interface SignupParameters {
  username: string
  salt: string
  verifier: string
  keychain: Omit<KeychainRecord, 'userID'>
}

// --

const handler = nextConnect()

handler.use(
  requireBodyParams<SignupParameters>({
    username: requiredString,
    salt: requiredString,
    verifier: requiredString,
    keychain: obj => Object.values(obj).every(requiredString)
  })
)
handler.use(database)

handler.post(
  async (req: Request<Db, SignupParameters>, res: NextApiResponse) => {
    const { username, salt, verifier, keychain } = req.body

    try {
      // todo: Pack all operations into a transaction
      const userID = await createUser(req.db, username, salt, verifier)
      await createUserAuthSettings(req.db, userID)
      await createKeychainRecord(req.db, { userID, ...keychain })
    } catch (error) {
      if (error.code === '23505') {
        // duplicate key value violates unique constraint
        return res.status(409).json({
          error: 'This username is already in use',
          details: error.detail
        })
      }
      console.error(error)
      return res.status(500).json({
        error: 'Unknown error',
        details: error.detail
      })
    }
    return res
      .status(201) // Created
      .send(null)
  }
)

export default handler
