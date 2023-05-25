const db = require('../utils/connectSQL')

class Review {
  constructor(user_id, product_id, rating, comment) {
    this.user_id = user_id
    this.product_id = product_id
    this.rating = rating
    this.comment = comment
  }

  async save() {
    const sqlQuery = `INSERT INTO reviews (user_id, product_id, rating, comment)
                      VALUES (?, ?, ?, ?)`
    const values = [this.user_id, this.product_id, +this.rating, this.comment]
    return await db.execute(sqlQuery, values)
  }

  static async find(id) {
    const sqlQuery = `SELECT rating, comment, name
                      FROM reviews
                      JOIN users
                      ON reviews.user_id = users.user_id
                      where reviews.product_id = '${id}'`
    const reviews = await db.execute(sqlQuery)
    return reviews[0]
  }
}

module.exports = Review
