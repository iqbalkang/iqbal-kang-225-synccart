const express = require('express')
const { getAllProducts, getSingleProduct, postProduct, deleteProduct } = require('../controllers/productsController')
const isAdmin = require('../middlewares/isAdmin')
const isAuthenticated = require('../middlewares/isAuthenticated')
const upload = require('../middlewares/upload')

const router = express.Router()

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log(req)
//     console.log('yay')
//     cb(null, './')
//   },
//   filename: function (req, file, cb) {
//     console.log(file)
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   },
// })

// const upload = multer({ storage: storage })

router.get('/', getAllProducts)
router.get('/:id', getSingleProduct)
router.post('/', isAuthenticated, isAdmin, upload.single('image'), postProduct)
router.delete('/:id', isAuthenticated, isAdmin, deleteProduct)

module.exports = router
