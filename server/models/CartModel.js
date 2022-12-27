const db = require('../utils/connectSQL')

class Cart {
  constructor(productId, userId, quantity, price) {
    this.productId = productId
    this.userId = userId
    this.quantity = quantity
    this.price = price
  }

  static async find() {
    const [cart] = await db.execute(`SELECT product_id as productId, price, quantity, price FROM carts`)
    return cart
  }

  static async deleteCart() {
    await db.execute('DELETE FROM carts')
  }

  async save() {
    await db.execute('INSERT INTO carts (product_Id, user_Id, quantity, price) values(?, ?, ?, ?)', [
      this.productId,
      this.userId,
      this.quantity,
      this.price,
    ])
  }
}

module.exports = Cart
