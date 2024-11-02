import { createBrowserRouter } from 'react-router-dom'

import { Feed } from '@/pages/feed'
import { SignIn } from '@/pages/sign-in'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: '/feed',
    element: <Feed />,
  },
])
