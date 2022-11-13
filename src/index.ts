import http from 'http'
import { Server as WebSocket } from 'socket.io'

import app from './app'
import dbConnection from './db/connection'
import environment from './config/environment'
import ioHandler from './ws'
import corsConfigs from './config/cors'
import AuthHelper from './helpers/AuthHelper'

const { port } = environment
const httpServer = http.createServer(app)
const ws = new WebSocket(httpServer, {
  cors: corsConfigs
})

dbConnection()
  .then(() =>
    ws
      .use(async (socket: any, next) => {
        const token = socket.request.headers.cookie
        const newToken = token as string
        try {
          const decoded = await AuthHelper.verifyToken(newToken)

          socket.decoded = decoded
        } catch (error) {
          next(new Error('Authentication Error'))
        }
      })
      .on('connection', ioHandler(ws))
  )
  .then(() =>
    httpServer.listen(port, () =>
      console.log(`Server is running at http://localhost:${port}`)
    )
  )
  .catch(console.log)
