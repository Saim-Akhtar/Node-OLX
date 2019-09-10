const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const multer = require('multer')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './userUploads')
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





const userController = require('./userController');
// const userAuth = require('./userAccountAuthentication');
const User = require('../Models/userModel')
require('../config/passport')

// SignUp User
router.post('/signup', upload.single('profilePic'), userController.signUp)

// login User
router.post('/login', passport.authenticate('local', { session: false }), userController.signIn)

// login Using Google Plus
router.post('/oauth/google', passport.authenticate('googleToken', { session: false }), userController.googleOAuth);

// login Using Facebook
router.post('/oauth/facebook', passport.authenticate('facebookToken', { session: false }), userController.facebookOAuth);

// Fetch User 
router.get('/:userID', userController.GetProfile)

// Update User 
router.patch('/:userID', userController.updateUser)




module.exports = router