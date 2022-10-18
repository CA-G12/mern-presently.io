import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Landing from './pages/Landing/Landing'
import Presentations from './pages/Presentation'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <h1>Page not found</h1>
  },
  {
    path: '/user',
    element: <Presentations />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
