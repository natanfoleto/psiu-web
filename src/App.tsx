import './main.css'

import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { router } from './routes'

function App() {
  return (
    <div>
      <Toaster position="top-right" closeButton richColors theme="dark" />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
