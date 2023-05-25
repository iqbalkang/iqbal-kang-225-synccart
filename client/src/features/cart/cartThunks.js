import { createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios'

export const getCartProduct = createAsyncThunk('cart/getCartProduct', async (id, thunkAPI) => {
  try {
    const { data } = await customFetch.get(`/products/${id}`)
    const { user } = thunkAPI.getState().user
    return { data: data.product, user }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const postCart = createAsyncThunk('cart/postCart', async (cart, thunkAPI) => {
  try {
    const { userId } = thunkAPI.getState().user.user
    const updatedCart = cart.map(cartItem => ({ ...cartItem, userId }))
    const { data } = await customFetch.post(`/cart`, updatedCart, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    return data.cart
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})
