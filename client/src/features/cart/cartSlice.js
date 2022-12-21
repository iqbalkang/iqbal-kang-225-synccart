import { createSlice } from '@reduxjs/toolkit'
import { getSingleProduct } from '../products/productsThunks'
import { getCartProduct } from './cartThunks'

const initialState = {
  isLoading: false,
  isError: null,
  cart: [],
  selectedQuantity: 1,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    selectedQuantityHandler: (state, { payload }) => {
      state.selectedQuantity = payload
    },
  },

  extraReducers: builder => {
    builder

      // GET SINGLE PRODUCT
      .addCase(getCartProduct.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(getCartProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false
        const { _id: productId, name, price, image, countInStock } = payload
        const product = { productId, name, price, image, quantity: state.selectedQuantity }

        const itemExists = state.cart.find(item => item.productId === productId)

        // if item already exists in the cart,THEN update the quantity, ELSE add to cart
        // if user selected higher number of items than the remaining stock THEN limit order quantity to remaining stock
        if (itemExists) {
          state.cart = state.cart.map(item => {
            if (item.productId === productId) {
              const quantity = item.quantity + product.quantity
              return { ...product, quantity: quantity <= countInStock ? quantity : countInStock }
            } else return item
          })
          return
        }
        state.cart = [...state.cart, product]
      })
      .addCase(getCartProduct.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = payload
      })
  },
})

export const { selectedQuantityHandler } = cartSlice.actions
export default cartSlice.reducer
