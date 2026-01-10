import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import {routes} from './config/route-config.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={routes} />
)
