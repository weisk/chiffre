import dotenv from 'dotenv'
import checkEnv from '@47ng/check-env'
import { createServer, startServer } from '@chiffre/api/dist/server'
import { App } from '@chiffre/api/dist/types'
import path from 'path'
import Client from '../../src/index'

export interface TestContext {
  server: App
  client: Client
}

export async function setup(): Promise<TestContext> {
  dotenv.config({
    path: path.join(path.dirname(__filename), 'e2e.env')
  })
  checkEnv({ required: ['API_URL'] })

  const port = parseInt(process.env.PORT || '4000')
  const server = createServer()
  await startServer(server, port)
  const client = new Client({
    apiURL: process.env.API_URL!
  })
  try {
    await server.db.migrate.rollback(undefined, true)
    await server.db.migrate.latest()
  } catch (e) {
    console.error(e)
  }
  return { server, client }
}
