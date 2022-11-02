import { useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import ws from 'socket.io-client'

import config from './config'
import axios from './api/axios'
import { UserInterface } from '../../src/interfaces/UserInterface'
import useAuth from './hooks/useAuth'
import Landing from './pages/Landing/Landing'
import Presentations from './pages/Presentation'
import Presentation from './pages/Presentation'
import Login from './components/Login'
import PublicRoute from './components/PublicRoute'
import PrivateRoute from './components/PrivateRoute'

const { domain } = config

const socket = ws(domain, {
  autoConnect: false
})

const App = () => {
  const { dispatch } = useAuth()
  useEffect(() => {
    ;(async () => {
      try {
        const user: UserInterface = await axios.post('/auth/token')

        dispatch && dispatch({ type: 'LOGIN', payload: { user } })
      } catch (err) {
        dispatch && dispatch({ type: 'LOGOUT' })
      }
    })()
    socket.open()

    socket.emit('login', 'UserId has logged in')

    socket.on('loggedOutUser', msg => {
      console.log(msg)
    })

    socket.emit('logout', 'user has logged out')

    socket.on('newLoggedUser', msg => {
      console.log(msg)
    })

    return () => {
      socket.close()
    }
  }, [])

  const element = useRoutes([
    {
      path: '/',
      element: (
        <PublicRoute>
          <Landing />
        </PublicRoute>
      )
    },
    {
      path: '/login',
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      )
    },

    {
      path: '/user',
      element: (
        <PrivateRoute>
          <Presentations />
        </PrivateRoute>
      )
    },
    {
      path: '/presentation/:id',
      element: (
        <PrivateRoute>
          <Presentation />
        </PrivateRoute>
      )
    }
  ])

  return element
}

export default App
