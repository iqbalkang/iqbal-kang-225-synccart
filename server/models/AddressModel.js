const db = require('../utils/connectSQL')

class Address {
  constructor(address, city, postal, country, user_id) {
    this.address = address
    this.city = city
    this.postal = postal
    this.country = country
    this.user_id = user_id
  }

  async save() {
    const sqlQuery = `INSERT INTO addresses (address, city, postal, country, user_id) VALUES (?, ?, ?, ?, ?)`
    const values = [this.address, this.city, this.postal, this.country, this.user_id]
    await db.execute(sqlQuery, values)
  }

  async updateOne() {
    const sqlQuery = `UPDATE addresses SET
                      address = '${this.address}',
                      city = '${this.city}',
                      postal = '${this.postal}',
                      country = '${this.country}'
                      WHERE user_id = ${this.user_id}`
    const [address] = await db.execute(sqlQuery)
  }

  static async findOne(user_id) {
    const [address] = await db.execute(`SELECT * FROM addresses WHERE user_id = '${user_id}'`)
    return address[0]
  }
}

module.exports = Address
