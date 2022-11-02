import { useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import ws from 'socket.io-client'
import useAuth from './hooks/useAuth'
import Landing from './pages/Landing/Landing'
import Presentations from './pages/Presentation'
import axios from './api/axios'
import PublicRoute from './components/PublicRoute'
import PrivateRoute from './components/PrivateRoute'
import { UserInterface } from '../../src/interfaces/UserInterface'
import Login from './components/Login'
import Presentation from './pages/Presentation'

const socket = ws('http://localhost:4000', {
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
