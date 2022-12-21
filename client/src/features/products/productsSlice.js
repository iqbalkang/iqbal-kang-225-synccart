import { createSlice } from '@reduxjs/toolkit'
import { getAllProducts, getSingleProduct } from './productsThunks'

const initialState = {
  isLoading: false,
  products: [],
  productDetails: null,
  isError: null,
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: builder => {
    builder

      // GET ALL PRODUCTS
      .addCase(getAllProducts.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(getAllProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.products = payload
      })
      .addCase(getAllProducts.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = payload
      })

      // GET SINGLE PRODUCT
      .addCase(getSingleProduct.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(getSingleProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.productDetails = payload
      })
      .addCase(getSingleProduct.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = payload
      })
  },
})

export default productSlice.reducer
