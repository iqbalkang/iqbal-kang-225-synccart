const express = require('express')
const cors = require('cors')
const AppError = require('./utils/AppError')
const { StatusCodes } = require('http-status-codes')

const productsRouter = require('./routes/productsRouter')
const globalErrorHandler = require('./middlewares/globalErrorHandler')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1/products', productsRouter)

app.use('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, StatusCodes.NOT_FOUND))
})

app.use(globalErrorHandler)

module.exports = app
