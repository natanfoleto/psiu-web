import './main.css'

import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { AuthProvider } from './contexts/auth'
import { router } from './routes'

function App() {
  return (
    <AuthProvider>
      <Toaster position="bottom-right" theme="light" closeButton />
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
