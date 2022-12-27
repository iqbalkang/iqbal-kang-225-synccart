const express = require('express')
const { postCart } = require('../controllers/cartController')

const router = express.Router()

router.post('/', postCart)

module.exports = router
