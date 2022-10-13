import express from 'express'
import compression from 'compression'
import cors from 'cors'
import environment from './config/environment'

const app = express()

app.use(compression())
app.use(
  cors({
    origin: environment.client.origin,
    credentials: true // access-control-allow-credentials:true
  })
)
app.use(express.json())

export default app
