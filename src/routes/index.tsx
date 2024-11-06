import { createBrowserRouter } from 'react-router-dom'

import { AuthLayout } from '@/pages/_layouts/auth'
import { Feed } from '@/pages/feed'
import { Profile } from '@/pages/profile'
import { SignIn } from '@/pages/sign-in'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/feed',
        element: <Feed />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
])
