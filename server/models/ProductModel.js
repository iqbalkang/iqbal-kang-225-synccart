const db = require('../utils/connectSQL')

class Product {
  constructor(name, price, description, brand, category, image, num_reviews, rating, stock) {
    this.name = name
    this.price = price
    this.description = description
    this.brand = brand
    this.category = category
    this.image = '/image/testing'
    this.num_reviews = num_reviews || 0
    this.rating = rating || 0
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

  async save() {
    const sqlQuery = `INSERT INTO products (name, price, description, brand, category, image, num_reviews, rating, stock)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const values = [
      this.name,
      this.price,
      this.description,
      this.brand,
      this.category,
      this.image,
      this.num_reviews,
      this.rating,
      this.stock,
    ]
    return await db.execute(sqlQuery, values)
  }

  static async deleteOne(id) {
    return await db.execute(`DELETE FROM products WHERE product_id = '${id}'`)
  }
}

module.exports = Product
