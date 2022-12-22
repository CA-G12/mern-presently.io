import { Server } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

const ioHandler =
  (ws: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) =>
  (socket: any) => {
    socket.on('comments', (comment: string, slideId: string) => {
      ws.emit('owner', comment, slideId)
    })
  }

export default ioHandler
