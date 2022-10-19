import http from 'http'
import app from './app'
import dbConnection from './db/connection'
import environment from './config/environment'

const { port } = environment
const server = http.createServer(app)

dbConnection()
  .then(() =>
    server.listen(port, () =>
      console.log(`Server is running at http://localhost:${port}`)
    )
  )
  .catch(console.log)
