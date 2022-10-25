import http from 'http'
import { Server } from 'socket.io'

import app from './app'
import dbConnection from './db/connection'
import environment from './config/environment'
import ioHandler from './io'
import corsConfigs from '../src/config/cors'

const { port } = environment
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
  cors: { ...corsConfigs }
})

dbConnection()
  .then(() => io.on('connect', ioHandler(io)))
  .then(() =>
    httpServer.listen(port, () =>
      console.log(`Server is running at http://localhost:${port}`)
    )
  )
  .catch(console.log)
