/**
 * This module centralize all the environment variables of the application. Thanks to this module, there MUST NOT be any
 * `process.env` instruction in any other file or module.
 */
import dotenv from 'dotenv'

dotenv.config()

const { DATABASE_URL, PORT, NODE_ENV } = process.env

const config = {
  database: {
    uri: DATABASE_URL
  },
  port: PORT || 3000,
  nodeEnv: NODE_ENV || 'development'
}

export default config
