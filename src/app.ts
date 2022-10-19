import express from 'express'
import compression from 'compression'
import cors from 'cors'
import environment from './config/environment'
import { userRouter } from '../src/routes/UserRoute'
const app = express()

app.use(compression())
app.use(
  cors({
    origin: environment.client.origin,
    credentials: true // access-control-allow-credentials:true
  })
)
app.use(express.json())
app.use('/api/v1', userRouter)
export default app
