import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import EditProduct from './pages/EditProduct';
import EditUser from './pages/EditUser';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Login from './pages/Login';
import { ProductPage } from './pages/ProductPage';
import Products from './pages/Products';
import Register from './pages/Register';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import Order from './pages/Order';
import Users from './pages/Users';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}>
        <Route index element={<Landing />} />
        <Route path='product/:id' element={<ProductPage />} />
        <Route path='cart' element={<Cart />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='admin/users' element={<Users />} />
        <Route path='admin/edit' element={<EditUser />} />
        <Route path='admin/products' element={<Products />} />
        <Route path='admin/products/edit' element={<EditProduct />} />
        <Route path='checkout' element={<Checkout />}>
          <Route path='shipping' element={<Shipping />} />
          <Route path='payment' element={<Payment />} />
          <Route path='order' element={<Order />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
