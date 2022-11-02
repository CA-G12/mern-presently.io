import { Navigate } from 'react-router-dom'
import UseAuth from '../hooks/useAuth'

interface BlankLayoutProps {
  children: JSX.Element
}

const BlankLayout = ({ children }: BlankLayoutProps): JSX.Element => {
  const { loggedIn } = UseAuth()

  return loggedIn ? <Navigate to="/user" /> : children
}

export default BlankLayout
