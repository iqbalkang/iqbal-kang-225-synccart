const express = require('express')
const { postCart } = require('../controllers/cartController')

const router = express.Router()

router.put('/:id', postCart)

module.exports = router
