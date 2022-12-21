import { createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios'

export const getAllProducts = createAsyncThunk('product/getAllProducts', async (_, thunkAPI) => {
  try {
    const { data } = await customFetch.get(`/products`)
    return data.products
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const getSingleProduct = createAsyncThunk('product/getSingleProduct', async (productId, thunkAPI) => {
  try {
    const { data } = await customFetch.get(`/products/${productId}`)
    return data.product
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})
