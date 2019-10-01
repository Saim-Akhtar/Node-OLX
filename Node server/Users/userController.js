const mongoose = require('mongoose')
const JWT = require('jsonwebtoken');
const User = require('../Models/userModel');

// generating a JWT token
generateToken = user => {
    return JWT.sign({
            id: user._id
        },
        process.env.JWT_KEY, {
            expiresIn: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
                // exp: Math.floor(Date.now() / 1000) + 30
        });
}

module.exports = {
    signUp: async(req, res, next) => {

        const { email, password, firstName, lastName, contact, profilePic, city } = req.body;


        // let profilePic = null

        // if (req.file !== undefined) {
        //     profilePic = req.file.path
        // }

        // Check if there is a user with the same email
        const foundUser = await User.findOne({ "local.email": email });
        if (foundUser) {
            return res.status(403).json({ error: 'Email is already in use' });
        }

        // Create a new user
        const newUser = new User({
            _id: mongoose.Types.ObjectId(),
            method: 'local',
            firstName: firstName,
            lastName: lastName,
            contact: contact,
            profilePic: profilePic,
            city: city,
            local: {
                email: email,
                password: password,
            }

        });
        await newUser.save();

        // Generate the token
        const token = generateToken(newUser);


        // the changes are made here 9/18/2019
        // Respond with token

        res.status(200).json({
            token: token,
            id: newUser._id,
            username: `${newUser.firstName} ${newUser.lastName}`,
            method: newUser.method
        });
    },

    signIn: async(req, res, next) => {

        // Generate token
        const token = generateToken(req.user);
        // the changes are made here 9/18/2019

        res.status(200).json({
            token: token,
            id: req.user._id,
            username: `${req.user.firstName} ${req.user.lastName}`,
            method: req.user.method
        });
    },
    googleOAuth: async(req, res, next) => {
        // Generate token
        const token = generateToken(req.user);
        // the changes are made here 9/18/2019
        res.status(200).json({
            token: token,
            id: req.user._id,
            username: `${req.user.firstName} ${req.user.lastName}`,
            method: req.user.method
        });
    },

    facebookOAuth: async(req, res, next) => {
        // Generate token
        const token = generateToken(req.user);
        // the changes are made here 9/18/2019
        res.status(200).json({
            token: token,
            id: req.user._id,
            username: `${req.user.firstName} ${req.user.lastName}`,
            method: req.user.method
        });
    },

    // getting a user profile 
    GetProfile: (req, res, next) => {
        const id = req.params.userID
        User.findById(id)
            .select('_id firstName lastName contact profilePic city method local.email google.email facebook.email')
            .then(user => {

                if (!user) {
                    return res.status(405).json({
                        message: `No user profile with ID ${id} found`,
                        status: "405"
                    })
                }
                res.status(200).json({
                    userProfile: user
                })

            })
            .catch(err => {
                res.status(404).json({
                    Error: err,
                    message: "Failed to fetch user profile",
                    status: "404"
                })
            })
    },

    // updating the user data
    // updateUser: async(req, res, next) => {
    //     const id = req.params.userID
    //     console.log(req.body)

    //     User.findOneAndUpdate({ _id: id }, req.body).exec()
    //         .then(user => {
    //             if (!user) {
    //                 return res.status(405).json({
    //                     message: `No user profile with ID ${id} found to be updated`,
    //                     status: "405"
    //                 })
    //             }

    //             res.status(200).json({
    //                 message: "User Profile Updated Successfully",
    //                 request: {
    //                     type: 'GET',
    //                     url: 'http://localhost:3000/users/' + id
    //                 }
    //             })
    //         })
    //         .catch(err => {
    //             res.status(404).json({
    //                 Error: err,
    //                 message: "Failed to update user profile",
    //                 status: "404"
    //             })
    //         })
    // }
}