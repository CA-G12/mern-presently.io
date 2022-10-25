import { Server } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

const login =
  (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) =>
  async () => {
    io.emit('newLoggedUser', 'user has logged in')
  }

export default login
