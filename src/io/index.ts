import { Server } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import loginHandler from './login'
// import disconnectHandler from './disconnect'

const ioHandler =
  (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) =>
  (socket: any) => {
    console.log('hello')
    // socket.on('login', loginHandler(socket))

    // socket.on('disconnecting', disconnectHandler(io, socket))
  }

export default ioHandler
