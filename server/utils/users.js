const bcrypt = require('bcryptjs')
const users = [
  {
    name: 'iqbal',
    email: 'iqbal.kang@yahoo.com',
    password: bcrypt.hashSync('dsdsdsd', 12),
    isAdmin: true,
  },
  {
    name: 'jeeto',
    email: 'jeeto.kang@yahoo.com',
    password: bcrypt.hashSync('dsdsdsdsdsd', 12),
    isAdmin: false,
  },
  {
    name: 'prince',
    email: 'prince.kang@yahoo.com',
    password: bcrypt.hashSync('dsdsdsd', 12),
    isAdmin: false,
  },
]

module.exports = users
