const products = require('./products')
const dotEnv = require('dotenv').config()
const db = require('./connectSQL')

const exportSQLDB = () => {
  products.forEach(product => {
    db.execute(`INSERT INTO products (name, description, rating, image, stock, num_reviews, price, category, brand)
    VALUES('${product.name}', '${product.description}','${product.rating}','${product.image}','${product.countInStock}','${product.numReviews}','${product.price}','${product.category}','${product.brand}')
    `)
  })
}
module.exports = exportSQLDB
