import { createSlice } from '@reduxjs/toolkit'
import { getReviews, postReview } from './reviewsThunks'

const initialState = {
  isLoading: false,
  reviews: [],
}

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    removeError(state) {
      state.isError = null
    },
  },
  extraReducers: builder => {
    builder

      // GET ALL PRODUCTS
      .addCase(postReview.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(postReview.fulfilled, (state, { payload }) => {
        state.isLoading = false
      })
      .addCase(postReview.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = payload
      })

      .addCase(getReviews.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(getReviews.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.reviews = payload
      })
      .addCase(getReviews.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = payload
      })
  },
})

export const { removeError } = reviewsSlice.actions
export default reviewsSlice.reducer
