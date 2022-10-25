import { Server } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import loginHandler from './login'
import signOutHandler from './logout'
import disconnectHandler from './disconnect'

const ioHandler =
  (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) =>
  (socket: any) => {
    console.log(`${socket.id} has connected`)

    socket.on('login', loginHandler(io))
    socket.on('logout', signOutHandler(io))
    socket.on('disconnect', disconnectHandler(socket))
  }

export default ioHandler
