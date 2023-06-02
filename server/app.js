const express = require('express');
const cors = require('cors');
const AppError = require('./utils/AppError');
const { StatusCodes } = require('http-status-codes');
const path = require('path');

const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const cartRouter = require('./routes/cartRouter');
const reviewsRouter = require('./routes/reviewsRouter');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const isAuthenticated = require('./middlewares/isAuthenticated');

const app = express();

app.use(express.json());
app.use(cors());

// Production
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api/v1/products', productsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/cart', isAuthenticated, cartRouter);
app.use('/api/v1/reviews', reviewsRouter);

app.use('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, StatusCodes.NOT_FOUND));
});

app.use(globalErrorHandler);

module.exports = app;
