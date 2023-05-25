const asyncHandler = require('express-async-handler')
const { StatusCodes } = require('http-status-codes')
const AppError = require('../utils/appError')
const Review = require('../models/ReviewModel')

const postReview = asyncHandler(async (req, res, next) => {
  const { rating, comment, product_id, user_id } = req.body

  const review = new Review(user_id, product_id, rating, comment)
  await review.save()
})

const getReviews = asyncHandler(async (req, res, next) => {
  const { id } = req.params

  const reviews = await Review.find(id)

  res.status(StatusCodes.OK).json({
    status: 'success',
    reviews,
  })
})

module.exports = { postReview, getReviews }
