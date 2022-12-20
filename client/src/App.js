import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Landing from './pages/Landing'
import { ProductPage } from './pages/ProductPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}>
        <Route index element={<Landing />} />
        <Route path='product/:id' element={<ProductPage />} />
      </Route>
    </Routes>
  )
}

export default App
