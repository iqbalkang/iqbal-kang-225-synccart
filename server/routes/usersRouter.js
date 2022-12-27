const express = require('express')
const { postLogin, postRegister, getUsers } = require('../controllers/usersController')
const isAuthenticated = require('../middlewares/isAuthenticared')
const isAdmin = require('../middlewares/isAdmin')

const router = express.Router()

router.post('/login', postLogin)
router.post('/register', postRegister)
router.get('/', isAuthenticated, isAdmin, getUsers)

module.exports = router
