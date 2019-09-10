const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    category: String,
    priceByOwner: { type: String, required: true },
    time: { type: String, default: new Date().toLocaleDateString() },
    productImage: { type: String, required: true },
    statusSold: { type: Boolean, default: false },
    highestBidPrice: String,
    buyer: { type: String, default: null },
    bids: [{
        bidderID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        bidderName: String,
        biddingPrice: String
    }]
})

module.exports = mongoose.model('Product', productSchema)