/**
 * This module centralize all the environment variables of the application. Thanks to this module, there MUST NOT be any
 * `process.env` instruction in any other file or module.
 */
import dotenv from 'dotenv'

dotenv.config()

const {
  DATABASE_URL,
  PORT,
  NODE_ENV,
  ORIGIN,
  SECRET_KEY,
  CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  REBRANDLY_API_KEY
} = process.env

const config = {
  database: {
    uri: DATABASE_URL || ''
  },
  port: PORT || 4000,
  nodeEnv: NODE_ENV || 'development',
  client: {
    origin: ORIGIN || 'https://presentlyio.netlify.app/'
  },
  jwt: {
    secretKey: SECRET_KEY || ''
  },
  cloudinary: {
    cloudName: CLOUD_NAME,
    apiKey: CLOUDINARY_API_KEY,
    apiSecret: CLOUDINARY_API_SECRET
  },
  rebrandly: {
    apiKey: REBRANDLY_API_KEY
  }
}

export default config
