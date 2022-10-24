import { Server } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

const login =
  (socket: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) =>
  async (socket: { id: any }) => {
    console.log('fff')
  }

export default login
