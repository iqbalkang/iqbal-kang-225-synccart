const mysql = require('mysql2')
require('dotenv').config()

// const pool = mysql.createPool({
//   host: process.env.SQL_HOST,
//   user: process.env.SQL_USER,
//   password: process.env.SQL_PASSWORD,
//   database: process.env.SQL_DB,
// })

// mysql://b96848e5b21132:550bb690@us-cdbr-east-06.cleardb.net/heroku_ac9cfa7077edb37?reconnect=true
const pool = mysql.createPool({
  host: 'us-cdbr-east-06.cleardb.net',
  user: 'b96848e5b21132',
  password: '550bb690',
  database: 'heroku_ac9cfa7077edb37',
})

module.exports = pool.promise()
