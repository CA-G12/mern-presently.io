import { useRoutes } from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import Presentations from './pages/Presentation'
import Login from './components/Login'

const App = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <Landing />
    },
    {
      path: '/login',
      element: <Login />
    },
    { path: '/user', element: <Presentations /> }
  ])

  return element
}

export default App
