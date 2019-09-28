const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// the changes are made here 9/18/2019
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    contact: { type: String, required: false, default: null },
    profilePic: { type: String, required: false },
    city: { type: String, required: false, default: null },
    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true
    },
    local: {
        email: { type: String, required: false },
        password: { type: String, required: false }
    },
    google: {
        id: String,
        email: { type: String, required: false }
    },
    facebook: {
        id: String,
        email: { type: String, required: false },
    }

})

userSchema.pre('save', async function(next) {
    try {
        if (this.method !== 'local') {
            next();
        }

        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Generate a password hash (salt + hash)
        const passwordHash = await bcrypt.hash(this.local.password, salt);
        // Re-assign hashed version over original, plain text password
        this.local.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isValidPassword = async function(newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.local.password);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = mongoose.model('User', userSchema)