import { useRoutes } from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import Presentations from './pages/Presentations'
import Presentation from './pages/Presentation'

const App = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <Landing />
    },
    { path: '/user', element: <Presentations /> },
    { path: '/presentation/:id', element: <Presentation /> }
  ])

  return element
}

export default App
