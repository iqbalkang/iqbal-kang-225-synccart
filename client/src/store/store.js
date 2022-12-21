import { configureStore } from '@reduxjs/toolkit'
import cartSlice from '../features/cart/cartSlice'
import productsSlice from '../features/products/productsSlice'

const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
  },
})

export default store
