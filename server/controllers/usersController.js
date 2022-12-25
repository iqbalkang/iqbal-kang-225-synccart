const asyncHandler = require('express-async-handler')
const { StatusCodes } = require('http-status-codes')
const User = require('../models/UserModel')
const AppError = require('../utils/AppError')

const postRegister = asyncHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body

  if (!name || !email || !password || !confirmPassword)
    return next(new AppError('Missing fields', StatusCodes.BAD_REQUEST))

  const user = await User.create(req.body)
  const token = user.createJWT(user._id)

  res.status(StatusCodes.OK).json({
    status: 'success',
    user: { userId: user._id, name: user.name, email: user.email, token },
  })
})

const postLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) return next(new AppError('Missing fields', StatusCodes.BAD_REQUEST))

  const user = await User.findOne({ email })
  if (!user) return next(new AppError('No user was found', StatusCodes.NOT_FOUND))

  const isValid = await user.comparePasswords(password)
  if (!isValid) return next(new AppError('Passwords do not match', StatusCodes.BAD_REQUEST))

  const token = user.createJWT(user._id)

  res.status(StatusCodes.OK).json({
    status: 'success',
    user: { userId: user._id, name: user.name, email: user.email, token },
  })
})

module.exports = { postLogin, postRegister }
