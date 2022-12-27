const asyncHandler = require('express-async-handler')
const { StatusCodes } = require('http-status-codes')
const AppError = require('../utils/AppError')
const User = require('../models/UserModel')

const postRegister = asyncHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body

  if (!name || !email || !password || !confirmPassword)
    return next(new AppError('Missing fields', StatusCodes.BAD_REQUEST))

  if (password !== confirmPassword) return next(new AppError('Passwords do not match', StatusCodes.BAD_REQUEST))

  const newUser = new User(name, email, password)
  const [user] = await newUser.save()

  const token = User.createJWT(user.insertId, email)

  res.status(StatusCodes.OK).json({
    status: 'success',
    user: { userId: user.insertId, name, email, token },
  })
})

const postLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) return next(new AppError('Missing fields', StatusCodes.BAD_REQUEST))

  const [user] = await User.findOne(email)
  if (!user) return next(new AppError('No user was found', StatusCodes.NOT_FOUND))

  const isValid = await User.comparePasswords(password, user.password)
  if (!isValid) return next(new AppError('Password does not match', StatusCodes.BAD_REQUEST))

  const token = User.createJWT(user.user_id, email)

  res.status(StatusCodes.OK).json({
    status: 'success',
    user: { userId: user.user_id, name: user.name, email: user.email, token, isAdmin: user.isAdmin },
  })
})

const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find()

  res.status(StatusCodes.OK).json({
    status: 'success',
    users,
  })
})

module.exports = { postLogin, postRegister, getUsers }
