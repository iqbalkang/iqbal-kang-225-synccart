import { createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios'

export const postLogin = createAsyncThunk('user/postLogin', async (body, thunkAPI) => {
  try {
    const { data } = await customFetch.post(`/users/login`, body)
    return data.user
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const postRegister = createAsyncThunk('user/postRegister', async (body, thunkAPI) => {
  try {
    const { data } = await customFetch.post(`/users/register`, body)
    return data.user
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const getUsers = createAsyncThunk('user/getUsers', async (_, thunkAPI) => {
  try {
    const { data } = await customFetch.get(`/users`, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    console.log(data)
    return data.users
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})
