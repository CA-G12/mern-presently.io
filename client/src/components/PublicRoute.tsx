import { ReactNode } from 'react'
import { Route, Navigate } from 'react-router-dom'
import UseAuth from '../hooks/useAuth'
interface Routepropss {
  children: ReactNode
}

const PublicRoute = ({ children }: Routepropss) => {
  const { auth } = UseAuth()
  return <Route>{auth.loggedIn ? <Navigate to="/user" /> : children}</Route>
}

export default PublicRoute
