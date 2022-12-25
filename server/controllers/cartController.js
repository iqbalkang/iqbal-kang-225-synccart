const asyncHandler = require('express-async-handler')
const Cart = require('../models/CartModel')
const { StatusCodes } = require('http-status-codes')
const AppError = require('../utils/appError')

const postCart = asyncHandler(async (req, res, next) => {
  const signedInUser = req.user._id

  const cart = await Cart.findOne({ belongsTo: req.params.id })
  console.log(res.body)

  // const cart = await Cart.create({
  //   belongsTo: signedInUser,
  //   items: req.body,
  // })

  res.status(StatusCodes.OK).json({
    status: 'success',
    cart,
  })
})

module.exports = { postCart }
