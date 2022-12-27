const db = require('../utils/connectSQL')

class Product {
  constructor(name, description, rating, stock) {
    this.name = name
    this.description = description
    this.rating = rating
    this.stock = stock
  }

  static async find() {
    const [products] = await db.execute('SELECT * FROM products')
    return products
  }

  static async findById(id) {
    const [product] = await db.execute(`SELECT * FROM products where product_id = '${id}'`)
    return product[0]
  }
}

module.exports = Product
