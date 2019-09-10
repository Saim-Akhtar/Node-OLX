const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const passport = require('passport')

const passportAuth = require('../config/passport')
const productController = require('./productController')


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './productUploads')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    // filtering files
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

// Extracting Product Model from Models
const Product = require('../Models/productModel')

// Fetch all the Products
router.get('/', productController.FetchAll)

// Fetch All Products Of A Certain Category
// router.get('/:category', productController.FetchCategory)

// Fetch A Specific Product
router.get('/:productID', productController.FetchAProduct)

// Add A Product
router.post('/', upload.single('productImage'), productController.addProduct)

// Add a Bid to a Product
router.patch('/bidding/:productID', productController.addBid)

// Modify A Users Bid 
router.patch('/modifyBid/:productID', productController.modifyBid)

// Update Product Sold
router.patch('/sell/:productID', productController.addBuyer)

// Delete a Product
router.delete('/:productID', productController.removeProduct)


module.exports = router