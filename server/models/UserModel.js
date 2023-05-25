const db = require('../utils/connectSQL');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class User {
  constructor(name, email, password, admin) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdmin = admin;
  }

  static async find() {
    const [users] = await db.execute('SELECT user_id, name, email, isAdmin FROM users');
    return users;
  }

  static async findOne(email) {
    const [user] = await db.execute(`SELECT * FROM users WHERE email = '${email}'`);
    return user;
  }

  async save() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    return db.execute('INSERT INTO users (name, email, password) VALUES(?, ?, ?)', [
      this.name,
      this.email,
      hashedPassword,
    ]);
  }

  static async deleteOne(id) {
    return await db.execute(`DELETE FROM users WHERE user_id = '${id}'`);
  }

  async updateOne(user_id) {
    const sqlQuery = `UPDATE users SET
                      name = '${this.name}',
                      email = '${this.email}',
                      isAdmin = '${this.isAdmin}'
                      WHERE user_id = ${user_id}`;
    const [user] = await db.execute(sqlQuery);
  }

  static createJWT(id, email) {
    return jwt.sign({ id, email }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRES_IN });
  }

  static async comparePasswords(enteredPassword, dbPassword) {
    return await bcrypt.compare(enteredPassword, dbPassword);
  }
}

module.exports = User;
