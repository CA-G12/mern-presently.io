import { ReactNode } from 'react'
interface Routepropss {
  children: ReactNode
}
import { Navigate, Route } from 'react-router-dom'
import UseAuth from '../hooks/useAuth'

const PrivateRoute = ({ children }: Routepropss) => {
  const { auth } = UseAuth()
  return <Route>{auth.loggedIn ? children : <Navigate to="/" />}</Route>
}

export default PrivateRoute
