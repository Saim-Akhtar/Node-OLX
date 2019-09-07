const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const JWT = require('jsonwebtoken');

const Product = require('../Models/productModel')

module.exports = {
    FetchAll: (req, res, next) => {
        Product.find()
            .select('_id title highestBidPrice productImage')
            .exec()
            .then((productList) => {
                res.status(200).json({
                    Total_Products: productList.length,
                    Products: productList.map(productItem => {
                        const productData = {}
                        productData.id = productItem._id
                        productData.title = productItem.title
                        productData.price = productItem.highestBidPrice
                        productData.productImage = productItem.productImage
                        productData['request'] = {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + productItem._id
                        }
                        return productData
                    })
                })
            })
            .catch(err => {
                console.log(err)
                res.status(404).json({
                    message: "Failed To Fetch Products",
                    status: "404"
                })
            })
    },
    FetchAProduct: (req, res, next) => {
        const id = req.params.productID
        Product.findById(id)
            .select('title category priceByOwner time productImage statusSold highestBidPrice buyer bids')
            .populate('userID', '_id method local google facebook')
            .then((product) => {
                if (product) {
                    res.status(200).json({
                        Product: product,
                        id: id
                            // request: {
                            //     type: 'GET',
                            //     description: 'Fetch All Products',
                            //     url: 'http://localhost:3000/products'
                            // }
                    })
                } else {
                    res.status(420).json({
                        message: `Product with ID : ${id} not found`
                    })
                }
            })
            .catch(err => {
                res.status(404).json({
                    Error: error,
                    message: "Failed To Fetch Product",
                    status: "404"
                })
            })
    },
    addProduct: async(req, res, next) => {
        const product = new Product({
            _id: mongoose.Types.ObjectId(),
            userID: req.body.userID,
            title: req.body.title,
            category: req.body.category,
            time: req.body.time,
            priceByOwner: req.body.price,
            highestBidPrice: req.body.price,
            productImage: req.file.path
        })

        // Saving the Product Into the Database
        product.save()
            .then(data => {
                res.status(201).json({
                    message: "Product has been added",
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + data._id
                    }
                })
            })
            .catch(err => {
                res.status(404).json({
                    Error: err,
                    message: "Failed To Add Product",
                    status: "404"
                })
            })
    },

    addBid: async(req, res, next) => {

        const id = req.params.productID
        const checkData = await Product.findById(id).select('highestBidPrice bids')
        let highestPrice
        if (checkData.bids.length !== 0) {
            const getBidPrices = checkData.bids.map(bid => bid.biddingPrice)
            console.log(getBidPrices)
            highestPrice = Math.max(...getBidPrices, checkData.highestBidPrice, req.body.biddingPrice)
        } else {
            console.log(checkData.highestBidPrice, req.body.biddingPrice)
            highestPrice = Math.max(checkData.highestBidPrice, req.body.biddingPrice)
        }

        console.log(highestPrice)
        Product.update({ _id: id }, { "$set": { "highestBidPrice": highestPrice }, "$push": { "bids": req.body } })
            // Product.update({ _id: id }, { "$set": { "highestBidPrice": "15000", "bids": [] } })
            .exec()
            .then((data) => {
                res.status(200).json({
                    message: `Successful bid on ${id} `,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + id
                    }
                })
            })
            .catch((error) => {
                res.status(404).json({
                    Error: error,
                    message: "Failed to bid the product",
                    status: "404"
                })
            })
    },

    addBuyer: (req, res, next) => {
        const id = req.params.productID
        Product.update({ _id: id }, req.body).exec()
            .then((data) => {
                res.status(200).json({
                    message: `${id} is Successfully Sold`,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + id
                    }
                })
            })
            .catch((error) => {
                res.status(404).json({
                    Error: error,
                    message: "Failed to Sell the product",
                    status: "404"
                })
            })
    },

    removeProduct: (req, res, next) => {
        const id = req.params.productID
        Product.findByIdAndDelete(id)
            .then((data) => {
                if (data) {
                    res.status(200).json({
                        message: `Product Id ${id} deleted`,

                    })
                } else {
                    res.status(500).json({
                        message: `Product Id ${id} not found`
                    })
                }

            })
            .catch((error) => {
                res.status(404).json({
                    Error: error,
                    message: "Failed to delete the product",
                    status: "404"
                })
            })
    }

}