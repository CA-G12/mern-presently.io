import AuthHelper from '../helpers/AuthHelper'
import { Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { ExtendedError } from 'socket.io/dist/namespace'

const WsAuthToken = async (
  socket:
    | Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
    | any,
  next: (err?: ExtendedError) => any
) => {
  try {
    const token = socket.request['x-access-token'].split(' ')[1]
    const jwtToken = token as string

    const decoded = await AuthHelper.verifyToken(jwtToken)

    socket.decoded = decoded
  } catch (error) {
    next(new Error('Authentication Error'))
  }
}

export default WsAuthToken
