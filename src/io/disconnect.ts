import { Server } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

const disconnect =
  (
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    socket: any
  ) =>
  async () => {
    socket.on('message', () => {
      console.log('user disconnected')
    })
  }

export default disconnect
