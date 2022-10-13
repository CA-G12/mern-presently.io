import http from 'http'
import app from './app'

import dbConnection from './db/connection'
import env from './config/environment'

const port = env.port || 4000
const server = http.createServer(app)

dbConnection()
  .then(() =>
    server.listen(port, () =>
      console.log(`Server is running at http://localhost:${port}`)
    )
  )
  .catch(console.log)
