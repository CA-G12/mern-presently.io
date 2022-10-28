import { useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import ws from 'socket.io-client'

import Landing from './pages/Landing/Landing'
import Presentations from './pages/Presentation'
import Login from './components/Login/index'

const socket = ws('http://localhost:4000', {
  autoConnect: false
})

const App = () => {
  useEffect(() => {
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
      element: <Landing />
    },
    { path: '/user', element: <Presentations /> },
    { path: '/login', element: <Login /> }
  ])

  return element
}

export default App
