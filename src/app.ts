import express from 'express'
import compression from 'compression'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import corsConfigs from './config/cors'
import router from './routes'

const app = express()

app.use([
  compression(),
  cookieParser(),
  express.json(),
  express.urlencoded({ extended: false }),
  cors(corsConfigs)
])

app.use('/api/v1', router)

export default app
