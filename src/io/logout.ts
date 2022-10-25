import { Server } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

const logout =
  (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) =>
  async () => {
    io.emit('loggedOutUser', 'user has logged out')
  }

export default logout
