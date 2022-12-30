import { createSlice } from '@reduxjs/toolkit'
import { postLogin, postRegister, getUsers, deleteUser, updateUser, getUserAddress } from './userThunks'
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage'

const initialState = {
  isLoading: false,
  user: getLocalStorage('user') || null,
  isError: null,
  allUsers: [],
}

const productSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userEdit(state, { payload }) {
      state.userEdit = payload
    },

    logout(state) {
      state.user = null
    },
  },
  extraReducers: builder => {
    builder

      // USER LOGIN
      .addCase(postLogin.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(postLogin.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload
        setLocalStorage('user', payload)
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

      // GET ALL USERS
      .addCase(getUsers.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.allUsers = payload
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = payload
      })

      // DELETE USER
      .addCase(deleteUser.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = payload
      })

      // UPDATE USER
      .addCase(updateUser.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = payload
      })

      // GET USER ADDRESS
      .addCase(getUserAddress.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(getUserAddress.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.userAddress = payload
      })
      .addCase(getUserAddress.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = payload
      })
  },
})

export const { userEdit, logout } = productSlice.actions
export default productSlice.reducer
