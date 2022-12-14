import { Navigate } from 'react-router-dom'
import UseAuth from '../hooks/useAuth'

interface PrivateRouteProps {
  children: JSX.Element
}

const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const { loggedIn } = UseAuth()

  return loggedIn ? children : <Navigate to="/" />
}

export default PrivateRoute
