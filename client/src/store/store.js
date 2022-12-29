import { configureStore } from '@reduxjs/toolkit'
import cartSlice from '../features/cart/cartSlice'
import productsSlice from '../features/products/productsSlice'
import reviewsSlice from '../features/reviews/reviewsSlice'
import userSlice from '../features/users/userSlice'

const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    user: userSlice,
    reviews: reviewsSlice,
  },
})

export default store
