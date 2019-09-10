const mongoose = require('mongoose')

const userNotifierSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bidNotifiers: [{
        productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        productTitle: String,
        notify: { type: Boolean, default: false },
        notificationMessage: String
    }]
})

module.exports = mongoose.model('userNotifier', userNotifierSchema)