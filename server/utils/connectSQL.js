const mysql = require('mysql2')
require('dotenv').config()

const pool = mysql.createPool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB,
})

module.exports = pool.promise()
