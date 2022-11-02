import { useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import ws from 'socket.io-client'
import routes from './routes/router'
import config from './config'
// import axios from './api/axios'
// import { UserInterface } from '../../src/interfaces/UserInterface'
// import useAuth from './hooks/useAuth'

const { wsBaseUrl } = config

const socket = ws(wsBaseUrl, {
  autoConnect: false
})

const App = () => {
  const routing = useRoutes(routes)
  // const { dispatch } = useAuth()

  useEffect(() => {
    // ;(async () => {
    //   try {
    //     const user: UserInterface = await axios.post('/auth/token')

    //     dispatch && dispatch({ type: 'LOGIN', payload: { user } })
    //   } catch (err) {
    //     dispatch && dispatch({ type: 'LOGOUT' })
    //   }
    // })()
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

  return routing
}

export default App
