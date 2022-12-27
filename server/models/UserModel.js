const db = require('../utils/connectSQL')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class User {
  constructor(name, email, password) {
    this.name = name
    this.email = email
    this.password = password
  }

  static async find() {
    const [users] = await db.execute('SELECT * FROM users')
    return users
  }

  static async findOne(email) {
    const [user] = await db.execute(`SELECT * FROM users WHERE email = '${email}'`)
    return user
  }

  async save() {
    const hashedPassword = await bcrypt.hash(this.password, 12)

    return db.execute('INSERT INTO users (name, email, password) VALUES(?, ?, ?)', [
      this.name,
      this.email,
      hashedPassword,
    ])
  }

  static createJWT(id, email) {
    return jwt.sign({ id, email }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRES_IN })
  }

  static async comparePasswords(enteredPassword, dbPassword) {
    return await bcrypt.compare(enteredPassword, dbPassword)
  }
}

module.exports = User
