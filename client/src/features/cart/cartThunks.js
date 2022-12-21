import { createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios'

export const getCartProduct = createAsyncThunk('cart/getCartProduct', async (id, thunkAPI) => {
  try {
    const { data } = await customFetch.get(`/products/${id}`)
    return data.product
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})
