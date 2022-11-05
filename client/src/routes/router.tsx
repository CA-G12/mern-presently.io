import Landing from '../pages/Landing/Landing'
import Presentations from '../pages/Presentations'
import Presentation from '../pages/Presentation'
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
    path: '/presentations',
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
