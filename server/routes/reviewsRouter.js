const express = require('express')
const { postReview, getReviews } = require('../controllers/reviewsController')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.get('/:id', getReviews)
router.post('/', isAuthenticated, postReview)

module.exports = router
