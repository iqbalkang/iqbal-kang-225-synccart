import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Login from './pages/Login'
import { ProductPage } from './pages/ProductPage'
import Register from './pages/Register'
import Users from './pages/Users'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}>
        <Route index element={<Landing />} />
        <Route path='product/:id' element={<ProductPage />} />
        <Route path='cart' element={<Cart />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='users' element={<Users />} />
      </Route>
    </Routes>
  )
}

export default App
