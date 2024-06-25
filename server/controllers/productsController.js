const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/AppError');
const Product = require('../models/ProductModel');

const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  console.log(products);

  res.status(StatusCodes.OK).json({
    status: 'success',
    products,
  });
});

const getSingleProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new AppError('No product was found', StatusCodes.NOT_FOUND));

  res.status(StatusCodes.OK).json({
    status: 'success',
    product,
  });
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  const product_id = req.params.id;
  await Product.deleteOne(product_id);

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'Product was deleted',
  });
});

const postProduct = asyncHandler(async (req, res, next) => {
  const { name, price, description, brand, category, stock } = req.body;
  const image = `/images/${req.file.filename}`;

  if (!name || !price || !description || !brand || !category || !stock)
    return next(new AppError('Missing fields', StatusCodes.BAD_REQUEST));
  const product = new Product(name, price, description, brand, category, image, stock);
  await product.save();
});

const editProduct = asyncHandler(async (req, res, next) => {
  const product_id = req.params.id;
  const { name, price, description, brand, category, stock } = req.body;

  if (!name || !price || !description || !brand || !category || !stock)
    return next(new AppError('Missing fields', StatusCodes.BAD_REQUEST));

  const product = new Product(name, price, description, brand, category, image, stock);
  await product.updateOne(product_id);
});

module.exports = { getAllProducts, getSingleProduct, deleteProduct, postProduct, editProduct };
