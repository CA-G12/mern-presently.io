import Landing from '../pages/Landing/Landing'
import Presentations from '../pages/Presentations'
import Presentation from '../pages/Presentation'
import BlankLayout from '../layouts/BlankLayout'
import NotFound from '../pages/404'
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
    element: <Presentation />
  },
  {
    path: '*',
    element: <NotFound />
  }
]

export default routes
