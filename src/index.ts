import http from 'http'
import { Server, Socket } from 'socket.io'

import app from './app'
import dbConnection from './db/connection'
import environment from './config/environment'
import ioHandler from './io'
import cors from '../src/config/cors'

const { port } = environment
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
  cors: { ...cors }
})

dbConnection()
  .then(() => io.on('connection', ioHandler(io)))
  .then(() =>
    httpServer.listen(port, () =>
      console.log(`Server is running at http://localhost:${port}`)
    )
  )
  .catch(console.log)
