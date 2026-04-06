import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ViewCars from './pages/ViewCars'
import CreateCar from './pages/CreateCar'
import CarDetails from './pages/CarDetails'
import EditCar from './pages/EditCar'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ViewCars />
  },
  {
    path: '/new',
    element: <CreateCar />
  },
  {
    path: '/cars/:id',
    element: <CarDetails />
  },
  {
    path: '/edit/:id',
    element: <EditCar />
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App