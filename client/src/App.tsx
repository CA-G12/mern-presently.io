import { useRoutes } from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import Presentations from './pages/Presentation'
import io from 'socket.io-client'
import { useEffect } from 'react'
import Login from './components/Login/index'

const socket = io('http://localhost:4000')

const App = () => {
  useEffect(() => {
    socket.open()

    //Login
    socket.emit('login', 'UserId has logged in')

    socket.on('loggedOutUser', msg => {
      console.log(msg)
    })

    //Logout
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
      element: <Landing />
    },
    { path: '/user', element: <Presentations /> },
    { path: '/login', element: <Login /> }
  ])

  return element
}

export default App
