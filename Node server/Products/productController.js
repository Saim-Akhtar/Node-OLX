const express = require('express')
const mongoose = require('mongoose')

// Extracting the Product Model
const Product = require('../Models/productModel')


// Verifing the highest price in the bids for a Product and returns the Highest Price
const verifyHighestBidPrice = async(id, req) => {
    const checkData = await Product.findById(id).select('priceByOwner bids')
    let highestPrice

    if (checkData.bids.length !== 0) {
        const getBidPrices = checkData.bids.map(bid => bid.biddingPrice)
        highestPrice = Math.max(...getBidPrices, checkData.priceByOwner, req.body.biddingPrice)
    } else {

        highestPrice = Math.max(checkData.priceByOwner, req.body.biddingPrice)
    }
    return highestPrice
}


module.exports = {
    // fetch all products from DB
    FetchAll: (req, res, next) => {

        Product.find()
            .select('_id title category highestBidPrice productImage statusSold userID priceByOwner')
            .populate('userID', '_id firstName lastName')
            .exec()
            .then((productList) => {
                res.status(200).json({
                    Total_Products: productList.length,
                    Products: productList.map(product => {
                        const productItem = {}
                        productItem.id = product._id
                        productItem.title = product.title
                        productItem.category = product.category
                        productItem.highestBidPrice = product.highestBidPrice
                        productItem.productImage = product.productImage
                        productItem.statusSold = product.statusSold
                        productItem.priceByOwner = product.priceByOwner
                            // the changes are made here 9/18/2019
                        productItem.userID = product.userID._id
                        productItem.name = `${product.userID.firstName} ${product.userID.lastName}`

                        return productItem
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
    // Fetch a single Product 
    FetchAProduct: (req, res, next) => {
        const id = req.params.productID
        Product.findById(id)
            .select('title category priceByOwner time productImage statusSold highestBidPrice buyer bids')
            .populate('userID', '_id firstName lastName')
            .then((product) => {
                if (product) {
                    // the changes are made here 9/18/2019
                    res.status(200).json({
                        Product: product,
                        id: id,
                        userID: product.userID._id
                    })
                } else {
                    res.status(420).json({
                        message: `Product with ID : ${id} not found`
                    })
                }
            })
            .catch(error => {
                res.status(404).json({
                    Error: error,
                    message: "Failed To Fetch Product",
                    status: "404"
                })
            })
    },

    // saving the product
    addProduct: async(req, res, next) => {
        const product = new Product({
            _id: mongoose.Types.ObjectId(),
            userID: req.body.userID,
            title: req.body.title,
            category: req.body.category,
            priceByOwner: req.body.price,
            highestBidPrice: req.body.price,
            // productImage: req.file.path
            productImage: req.body.productImage
        })

        // Saving the Product Into the Database
        product.save()
            .then(data => {
                res.status(201).json({
                    id: data._id,
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

    // adding a new Bid in the product
    addBid: async(req, res, next) => {

        const id = req.params.productID

        try {
            data = await Product.update({ _id: id }, { "$push": { "bids": req.body } }).exec()
            const highestPrice = await verifyHighestBidPrice(id, req)
            data = await Product.update({ _id: id }, { "$set": { "highestBidPrice": highestPrice } }).exec()
            if (data) {
                res.status(200).json({
                    message: `Successful bid on ${id} `,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + id
                    }
                })
            }
        } catch (error) {
            res.status(404).json({
                Error: error,
                message: "Failed to bid the product",
                status: "404"
            })
        }

    },


    // modifying a current Bid in the product
    modifyBid: async(req, res, next) => {

        const id = req.params.productID

        try {
            data = await Product.update({ _id: id, "bids.bidderID": req.body.bidderID }, { '$set': { 'bids.$.biddingPrice': req.body.biddingPrice } })
            const highestPrice = await verifyHighestBidPrice(id, req)
            data = await Product.update({ _id: id }, { '$set': { 'highestBidPrice': highestPrice } })
            if (!data) {
                res.status(404).json({
                    message: `Failed modified bid on ${id} `,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + id
                    }
                })
            }
            if (data) {
                // console.log(data)
                res.status(200).json({
                    message: `Successfully modified bid on ${id} `,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + id
                    }
                })
            }
        } catch (error) {
            res.status(404).json({
                Error: error,
                message: "Failed to bid the product",
                status: "404"
            })
        }

    },

    // adding a buyer of the product
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

    // removing the product
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
    },

    // Fetch a User Products
    Fetch_UserProducts: async(req, res, next) => {
        const userID = req.params.userID
        try {
            const userProducts = await Product.find({ 'userID': userID }).select('_id title highestBidPrice statusSold')
            const user_bidProducts = await Product.find({ 'bids.bidderID': userID }).select('_id title highestBidPrice statusSold buyer')
            res.status(200).json({ userProducts, user_bidProducts })
        } catch (err) {
            res.status(404).json(err)
        }

    }

}