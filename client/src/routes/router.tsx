import Landing from '../pages/Landing/Landing'
import Presentations from '../pages/Presentation'
import Presentation from '../pages/Presentation'
import Login from '../components/Login'
import BlankLayout from '../layouts/BlankLayout'
import PrivateRoute from './PrivateRoute'

const routes = [
  {
    path: '/',
    element: (
      <BlankLayout>
        <Landing />
      </BlankLayout>
    )
  },
  {
    path: '/login',
    element: (
      <BlankLayout>
        <Login />
      </BlankLayout>
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
    path: '/presentations/:id',
    element: (
      <PrivateRoute>
        <Presentation />
      </PrivateRoute>
    )
  }
]

export default routes
