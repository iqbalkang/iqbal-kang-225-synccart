import { createSlice } from '@reduxjs/toolkit'
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage'
import { getAllProducts, getSingleProduct } from './productsThunks'

const initialState = {
  isLoading: false,
  products: getLocalStorage('products'),
  productDetails: null,
  isError: null,
  productEdit: null,
  isEditing: false,
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productEdit(state, { payload }) {
      state.productEdit = payload
      state.isEditing = true
    },
    resetEditProduct(state, { payload }) {
      state.productEdit = null
      state.isEditing = false
    },
  },
  extraReducers: builder => {
    builder

      // GET ALL PRODUCTS
      .addCase(getAllProducts.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(getAllProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.products = payload
        setLocalStorage('products', payload)
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

export const { productEdit, resetEditProduct } = productSlice.actions
export default productSlice.reducer
