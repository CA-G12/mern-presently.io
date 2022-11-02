import { useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import ws from 'socket.io-client'
import routes from './routes/router'
import config from './config'
import useAuth from './hooks/useAuth'
import { authApi } from './api'

const { wsBaseUrl } = config

const socket = ws(wsBaseUrl, {
  autoConnect: false
})

const App = () => {
  const routing = useRoutes(routes)
  const { dispatch, checkedToken } = useAuth()

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

  useEffect(() => {
    ;(async () => {
      try {
        const user = await authApi.authenticateWithToken()

        dispatch({ type: 'INITIALIZE', payload: { user, loggedIn: true } })
      } catch (err) {
        dispatch({
          type: 'INITIALIZE',
          payload: { user: null, loggedIn: false }
        })
      }
    })()
  }, [])

  return checkedToken ? routing : <div>Loading</div>
}

export default App
