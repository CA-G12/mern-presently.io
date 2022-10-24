import { useRoutes } from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import Presentations from './pages/Presentation'
import io from 'socket.io-client'
import { useEffect } from 'react'


const ws = 'http://localhost:4000'

const App = () => {
  useEffect(() => {}, [])
  const element = useRoutes([
    {
      path: '/',
      element: <Landing />
    },
    { path: '/user', element: <Presentations /> }
  ])

  return element
}

export default App


slides.find( {{id: userID}, "slides": { id: searchID } } )
