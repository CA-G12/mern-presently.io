import http from 'http'
import { Server as WebSocket } from 'socket.io'

import app from './app'
import dbConnection from './db/connection'
import environment from './config/environment'
import ioHandler from './ws'
import corsConfigs from './config/cors'

const { port } = environment
const httpServer = http.createServer(app)
const ws = new WebSocket(httpServer, {
  cors: corsConfigs
})

dbConnection()
  .then(() => ws.on('connect', ioHandler(ws)))
  .then(() =>
    httpServer.listen(port, () =>
      console.log(`Server is running at http://localhost:${port}`)
    )
  )
  .catch(console.log)
