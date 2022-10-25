import express from 'express'
import compression from 'compression'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import router from './routes'
import corsConfigs from './config/cors'

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
