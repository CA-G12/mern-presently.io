import { Server } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import loginHandler from './login'
import signOutHandler from './logout'
import disconnectHandler from './disconnect'

const ioHandler =
  (ws: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) =>
  (socket: any) => {
    console.log(`${socket.id} has connected`)

    socket.on('login', loginHandler(ws))
    socket.on('logout', signOutHandler(ws))
    socket.on('disconnect', disconnectHandler(socket))

    socket.on('comments', (comment: string, slideId: string) => {
      ws.emit('owner', comment, slideId)
    })
  }

export default ioHandler
