import { createSlice } from '@reduxjs/toolkit'
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage'
import { getSingleProduct } from '../products/productsThunks'
import { getCartProduct, postCart } from './cartThunks'

const initialState = {
  isLoading: false,
  isError: null,
  cart: getLocalStorage('cart') || [],
  selectedQuantity: 1,
  onCart: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    selectedQuantityHandler: (state, { payload }) => {
      state.selectedQuantity = payload
    },
    deleteProduct: (state, { payload }) => {
      state.cart = state.cart.filter(item => item.productId !== payload)
      setLocalStorage('cart', state.cart)
    },
    onCartToggler: state => {
      state.onCart = true
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

        const user = payload.user
        const { product_id: productId, stock, price } = payload.data
        const product = {
          productId,
          quantity: state.selectedQuantity,
          userId: user ? user.userId : null,
          price: +price,
        }

        const itemExists = state.cart.find(item => item.productId === productId)

        // if item already exists in the cart,THEN update the quantity, ELSE add to cart
        // if user selected higher number of items than the remaining stock THEN limit order quantity to remaining stock

        if (itemExists) {
          state.cart = state.cart.map(item => {
            if (item.productId === productId) {
              let quantity = item.quantity + product.quantity

              if (state.onCart) {
                quantity = state.selectedQuantity
                state.onCart = false
              }

              return { ...product, quantity: quantity <= stock ? quantity : stock }
            } else return item
          })
        } else {
          state.cart = [...state.cart, product]
        }
        setLocalStorage('cart', state.cart)
        state.selectedQuantity = 1
      })
      .addCase(getCartProduct.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = payload
      })

      // POST USER CART
      .addCase(postCart.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(postCart.fulfilled, (state, { payload }) => {
        console.log(payload)
        state.isLoading = false
        state.cart = payload
      })
      .addCase(postCart.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = payload
      })
  },
})

export const { selectedQuantityHandler, deleteProduct, onCartToggler } = cartSlice.actions
export default cartSlice.reducer
