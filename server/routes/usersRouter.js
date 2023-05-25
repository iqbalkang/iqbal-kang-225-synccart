const express = require('express')
const {
  postLogin,
  postRegister,
  getUsers,
  deleteUser,
  updateUser,
  postUserAddress,
  getUserAddress,
  putUserAddress,
} = require('../controllers/usersController')
const isAuthenticated = require('../middlewares/isAuthenticated')
const isAdmin = require('../middlewares/isAdmin')

const router = express.Router()

router.post('/address', isAuthenticated, postUserAddress)
router.get('/address', isAuthenticated, getUserAddress)
router.put('/address', isAuthenticated, putUserAddress)

router.post('/login', postLogin)
router.post('/register', postRegister)
router.get('/', isAuthenticated, isAdmin, getUsers)
router.put('/:id', isAuthenticated, isAdmin, updateUser)
router.delete('/:id', isAuthenticated, isAdmin, deleteUser)

module.exports = router
