const asyncHandler = require('express-async-handler')
const { StatusCodes } = require('http-status-codes')
const AppError = require('../utils/appError')
const Product = require('../models/ProductModel')

const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find()

  res.status(StatusCodes.OK).json({
    status: 'success',
    products,
  })
})

const getSingleProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) return next(new AppError('No product was found', StatusCodes.NOT_FOUND))

  res.status(StatusCodes.OK).json({
    status: 'success',
    product,
  })
})

module.exports = { getAllProducts, getSingleProduct }
