import http from 'http'
import app from './app'

const port = 3000

const server = http.createServer(app)

server.listen(port, () => console.log(`app is running on prot: ${port}`))
