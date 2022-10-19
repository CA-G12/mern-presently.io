import { useRoutes } from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import Presentations from './pages/Presentation'

const App = () => {
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
