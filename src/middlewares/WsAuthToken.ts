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
  const token = socket.request.headers.cookie
  const newToken = token as string
  try {
    const decoded = await AuthHelper.verifyToken(newToken)

    socket.decoded = decoded
  } catch (error) {
    next(new Error('Authentication Error'))
  }
}

export default WsAuthToken
