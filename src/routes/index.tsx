import type { ReactNode } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { useAuth } from '@/contexts/auth'
import { AuthLayout } from '@/pages/_layouts/auth'
import { Home } from '@/pages/home'
import { Profile } from '@/pages/profile'
import { SignIn } from '@/pages/sign-in'

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { signed } = useAuth()

  if (signed) return <Navigate to="/" replace />

  return children
}

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { signed } = useAuth()

  if (!signed) return <Navigate to="/sign-in" replace />

  return children
}

export const router = createBrowserRouter([
  {
    path: '/sign-in',
    element: (
      <PublicRoute>
        <SignIn />
      </PublicRoute>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AuthLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
])
