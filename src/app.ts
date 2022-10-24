import express from 'express'
import compression from 'compression'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './routes'
import cors from '../src/config/cors'

const app = express()

app.use([
  compression(),
  cookieParser(),
  express.json(),
  express.urlencoded({ extended: false }),
  cors({ ...cors })
])

app.use('/api/v1', router)

export default app
