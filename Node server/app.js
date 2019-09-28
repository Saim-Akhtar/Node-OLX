const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


// Extracting the routes 
const user = require('./Users/userRoute')
const product = require('./Products/productRoute')


// mongoDB connection and settings
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://saim59:' + process.env.MONGODB_ATLAS_PWD + '@db-auction-system-bitsj.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

mongoose.Promise = global.Promise


app.use(morgan('combined'))


// Parsing Body
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));




app.use('/userUploads', express.static('userUploads'))
app.use('/productUploads', express.static('productUploads'))
    // resolving CORS
app.use(cors())
    // app.use((req, res, next) => {
    //     res.header("Access-Control-Allow-Origin", "*")
    //     res.header(
    //         "Access-Control-Allow-Headers",
    //         "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    //     )
    //     if (req.method == "OPTIONS") {
    //         res.header('Access-Control-Allow-Methods', 'PUT', 'PATCH', 'POST', 'DELETE', 'GET')
    //         return res.status(200).json({})
    //     }
    //     next()
    // })

// Settings url routes to access the routes set by express

app.use('/user', user)
app.use('/products', product)



// Error Handling
app.use((req, res, next) => {
    const error = new Error('Data Not Found #Node')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 459)
    res.json({
        Error: {
            message: error.message
        }
    })
})


module.exports = app