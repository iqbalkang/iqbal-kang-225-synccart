const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  items: [
    {
      productId: {
        type: String,
        required: [true, 'Product id is missing'],
      },
      name: {
        type: String,
        required: [true, 'Product name is missing'],
      },
      price: {
        type: Number,
        required: [true, 'Product price is missing'],
      },
      image: {
        type: String,
        required: [true, 'Product image is missing'],
      },
      quantity: {
        type: Number,
        required: [true, 'Product quantity is missing'],
      },
      countInStock: {
        type: Number,
        required: [true, 'Product count in stock is missing'],
      },
    },
  ],
  belongsTo: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
})

module.exports = mongoose.model('Cart', cartSchema)
