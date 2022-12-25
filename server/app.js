const express = require('express')
const cors = require('cors')
const AppError = require('./utils/AppError')
const { StatusCodes } = require('http-status-codes')

const productsRouter = require('./routes/productsRouter')
const usersRouter = require('./routes/usersRouter')
const cartRouter = require('./routes/cartRouter')
const globalErrorHandler = require('./middlewares/globalErrorHandler')
const isAuthenticated = require('./middlewares/isAuthenticared')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1/products', productsRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/cart', isAuthenticated, cartRouter)

app.use('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, StatusCodes.NOT_FOUND))
})

app.use(globalErrorHandler)

module.exports = app
