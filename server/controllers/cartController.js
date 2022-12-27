const asyncHandler = require('express-async-handler')
const Cart = require('../models/CartModel')
const { StatusCodes } = require('http-status-codes')
const AppError = require('../utils/appError')

const postCart = asyncHandler(async (req, res, next) => {
  if (req.body.length === 0) {
    const cart = await Cart.find()

    return res.status(StatusCodes.OK).json({
      status: 'success',
      cart,
    })
  }

  await Cart.deleteCart()

  for (const item of req.body) {
    const { productId, userId, quantity, price } = item

    const cart = new Cart(productId, userId, quantity, price)
    await cart.save()
  }

  const cart = await Cart.find()

  res.status(StatusCodes.OK).json({
    status: 'success',
    cart,
  })
})

module.exports = { postCart }
