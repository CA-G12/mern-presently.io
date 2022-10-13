import http from 'http'
import app from './app'

import dbConnection from './db/connection'
import env from './config/environment'

const port = env.port || 4000
const server = http.createServer(app)

;(async () => {
  try {
    await dbConnection()
    server.listen(port, () =>
      console.log(
        `connected to the database & server is running at http://localhost:${port}`
      )
    )
  } catch (err) {
    console.log(err)
  }
})()
