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
    return data.users
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const deleteUser = createAsyncThunk('user/deleteUser', async (user_id, thunkAPI) => {
  try {
    const { data } = await customFetch.delete(`/users/${user_id}`, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    return data.message
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const updateUser = createAsyncThunk('user/updateUser', async (body, thunkAPI) => {
  try {
    const { data } = await customFetch.put(`/users/${body.user_id}`, body.body, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    return data.message
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})
