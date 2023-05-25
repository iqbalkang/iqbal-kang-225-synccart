const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/AppError');
const User = require('../models/UserModel');
const Address = require('../models/AddressModel');

const postRegister = asyncHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword)
    return next(new AppError('Missing fields', StatusCodes.BAD_REQUEST));

  if (password !== confirmPassword) return next(new AppError('Passwords do not match', StatusCodes.BAD_REQUEST));

  const newUser = new User(name, email, password);

  const [user] = await newUser.save();

  const token = User.createJWT(user.insertId, email);

  res.status(StatusCodes.OK).json({
    status: 'success',
    user: { userId: user.insertId, name, email, token },
  });
});

const postLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next(new AppError('Missing fields', StatusCodes.BAD_REQUEST));

  const [user] = await User.findOne(email);
  if (!user) return next(new AppError('No user was found', StatusCodes.NOT_FOUND));

  const isValid = await User.comparePasswords(password, user.password);
  if (!isValid) return next(new AppError('Password does not match', StatusCodes.BAD_REQUEST));

  const token = User.createJWT(user.user_id, email);

  const address = await Address.findOne(user.user_id);

  res.status(StatusCodes.OK).json({
    status: 'success',
    user: { userId: user.user_id, name: user.name, email: user.email, token, isAdmin: user.isAdmin },
  });
});

const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(StatusCodes.OK).json({
    status: 'success',
    users,
  });
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const user_id = req.params.id;
  await User.deleteOne(user_id);

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'user was deleted',
  });
});

const updateUser = asyncHandler(async (req, res, next) => {
  const user_id = req.params.id;
  const { name, email, admin: isAdmin } = req.body;

  const user = new User(name, email, null, isAdmin);
  await user.updateOne(user_id);

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'user was updated',
  });
});

const postUserAddress = asyncHandler(async (req, res, next) => {
  const { user_id } = req.user;
  const { address, city, postal, country } = req.body;

  if (!address || !city || !postal || !country) return next(new AppError('Missing fields', StatusCodes.BAD_REQUEST));

  const newAddress = new Address(address, city, postal, country, user_id);
  await newAddress.save();

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'address was added',
  });
});

const getUserAddress = asyncHandler(async (req, res, next) => {
  const { user_id } = req.user;
  const address = await Address.findOne(user_id);

  res.status(StatusCodes.OK).json({
    status: 'success',
    address,
  });
});

const putUserAddress = asyncHandler(async (req, res, next) => {
  const { user_id } = req.user;
  const { address, city, postal, country } = req.body;

  if (!address || !city || !postal || !country) return next(new AppError('Missing fields', StatusCodes.BAD_REQUEST));

  const newAddress = new Address(address, city, postal, country, user_id);
  await newAddress.updateOne();

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'address was updated',
  });
});

module.exports = {
  postLogin,
  postRegister,
  getUsers,
  deleteUser,
  updateUser,
  postUserAddress,
  getUserAddress,
  putUserAddress,
};
