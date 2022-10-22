/**
 * This module centralize all the environment variables of the application. Thanks to this module, there MUST NOT be any
 * `process.env` instruction in any other file or module.
 */
import dotenv from 'dotenv'

dotenv.config()

const { DATABASE_URL, PORT, NODE_ENV, ORIGIN, SECRET_KEY } = process.env

const config = {
  database: {
    uri: DATABASE_URL || ''
  },
  port: PORT || 3000,
  nodeEnv: NODE_ENV || 'development',
  client: {
    origin: ORIGIN || 'http://localhost:3000'
  },
  jwt: {
    secretKey: SECRET_KEY || ''
  }
}

export default config
