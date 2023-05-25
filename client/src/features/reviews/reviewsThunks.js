import { createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios'

export const getReviews = createAsyncThunk('product/getReviews', async (id, thunkAPI) => {
  try {
    const { data } = await customFetch.get(`/reviews/${id}`)
    return data.reviews
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const postReview = createAsyncThunk('user/postReview', async (body, thunkAPI) => {
  try {
    const { data } = await customFetch.post(`/reviews`, body, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})
