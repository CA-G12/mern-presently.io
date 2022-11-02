import { Navigate } from 'react-router-dom'
import UseAuth from '../hooks/useAuth'
interface PublicRouteProps {
  children: JSX.Element
}

const PublicRoute = ({ children }: PublicRouteProps): JSX.Element => {
  const { auth } = UseAuth()

  return auth.loggedIn ? <Navigate to="/user" /> : children
}

export default PublicRoute
