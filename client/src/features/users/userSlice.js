import { createSlice } from '@reduxjs/toolkit'
import { postLogin, postRegister } from './userThunks'

const initialState = {
  isLoading: false,
  user: null,
  isError: null,
}

const productSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder

      // USER LOGIN
      .addCase(postLogin.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(postLogin.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload
        state.isError = false
      })
      .addCase(postLogin.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = payload
      })

      // USER REGISTER
      .addCase(postRegister.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(postRegister.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload
      })
      .addCase(postRegister.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = payload
      })
  },
})

export default productSlice.reducer
