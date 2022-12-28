const express = require('express')
const { postLogin, postRegister, getUsers, deleteUser, updateUser } = require('../controllers/usersController')
const isAuthenticated = require('../middlewares/isAuthenticated')
const isAdmin = require('../middlewares/isAdmin')

const router = express.Router()

router.post('/login', postLogin)
router.post('/register', postRegister)
router.get('/', isAuthenticated, isAdmin, getUsers)
router.put('/:id', isAuthenticated, isAdmin, updateUser)
router.delete('/:id', isAuthenticated, isAdmin, deleteUser)

module.exports = router
