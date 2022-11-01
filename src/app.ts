import express from 'express'
import compression from 'compression'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import environment from './config/environment'
import router from './routes'

const app = express()

app.use([
  compression(),
  cookieParser(),
  express.json(),
  express.urlencoded({ extended: false }),
  cors({
    origin: environment.client.origin,
    credentials: true // access-control-allow-credentials:true
  })
])



app.use('/api/v1', router)

export default app
