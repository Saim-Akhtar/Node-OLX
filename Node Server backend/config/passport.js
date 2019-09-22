const mongoose = require('mongoose')
const passport = require('passport')
require('dotenv').config()
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require('passport-jwt')
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt


const User = require('../Models/userModel')

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    async(email, password, done) => {
        try {
            // Find the user given the email

            const user = await User.findOne({ "local.email": email });

            // If not, handle it
            if (!user) {
                return done(null, false, { message: "User Not Found" });
            }

            // Check if the password is correct
            const isMatch = await user.isValidPassword(password);
            // If not, handle it
            if (!isMatch) {

                return done(null, false, { message: "Invalid Email or password" });
            }

            // Otherwise, return the user
            done(null, user)
        } catch (error) {
            done(error, false);
        }
    }
))

// Google OAuth Strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: process.env.oauth_google_clientID,
    clientSecret: process.env.oauth_google_clientSecret
}, async(accessToken, refreshToken, profile, done) => {
    try {
        // Should have full user profile over here
        // console.log('profile', profile);
        // console.log('accessToken', accessToken);
        // console.log('refreshToken', refreshToken);

        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }
        // the changes are made here 9/18/2019
        const newUser = new User({
            _id: mongoose.Types.ObjectId(),
            method: 'google',
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            profilePic: profile.photos[0].value,
            google: {
                id: profile.id,
                email: profile.emails[0].value,

            }
        });

        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error, false, error.message);
    }
}));

passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: process.env.oauth_facebook_clientID,
    clientSecret: process.env.oauth_facebook_clientSecret
}, async(accessToken, refreshToken, profile, done) => {
    try {
        // console.log('profile', profile);
        // console.log('accessToken', accessToken);
        // console.log('refreshToken', refreshToken);

        const existingUser = await User.findOne({ "facebook.id": profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }

        // the changes are made here 9/18/2019
        const newUser = new User({
            _id: mongoose.Types.ObjectId(),
            method: 'facebook',
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            profilePic: profile.photos[0].value,
            facebook: {
                id: profile.id,
                email: profile.emails[0].value,

            }
        });

        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error, false, error.message);
    }
}));




passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token'),
        secretOrKey: process.env.JWT_KEY
    },
    async(jwtPayload, done) => {

        try {
            const user = await User.findById(jwtPayload.sub);

            // If user doesn't exists, handle it
            if (!user) {
                return done(null, false);
            }

            // Otherwise, return the user
            done(null, user);
        } catch (error) {
            done(error, false);
        }
    }
))