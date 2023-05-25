const connectDB = require('./connectDB')
const Product = require('../models/ProductModel')
const User = require('../models/UserModel')
const users = require('./users')
const products = require('./products')
const dotEnv = require('dotenv').config()

const exportDb = async () => {
  try {
    await connectDB(process.env.MONGO_URI)

    await User.deleteMany()
    await Product.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUserId = createdUsers[0]._id

    const productsWithId = products.map(product => {
      return { ...product, user: adminUserId }
    })

    await Product.insertMany(productsWithId)
  } catch (error) {
    console.log(error)
  }
}

exportDb()
