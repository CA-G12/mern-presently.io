import { Server } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

const logout =
  (ws: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) =>
  async () => {
    ws.emit('loggedOutUser', 'user has logged out')
  }

export default logout
