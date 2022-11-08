import { Server } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import loginHandler from './login'
import signOutHandler from './logout'
import disconnectHandler from './disconnect'
import Slide from 'models/SlideModel'

const ioHandler =
  (ws: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) =>
  (socket: any) => {
    console.log(`${socket.id} has connected`)

    socket.on('join', (id: string) => {
      socket.join(id)
    })

    socket.on('login', loginHandler(ws))
    socket.on('logout', signOutHandler(ws))
    socket.on('disconnect', disconnectHandler(socket))

    socket.on('comments', (comment: string, slideId: string) => {
      ws.to(slideId).emit('owner', comment)
    })

    socket.on('leaveRoom', (slideId: string) => {
      socket.leave(slideId)
    })
  }

export default ioHandler
