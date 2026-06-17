const mongoose = require('mongoose')

const config = require('../config/config')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: config.MIN_USERNAME_LENGTH,
        unique: true
    },
    name: String,
    hashedPassword: String
})

userSchema.set('toJSON', {
    transform: (document, jsonResult) => {
        jsonResult.id = document._id
        delete jsonResult.hashedPassword
        delete jsonResult._id
        delete jsonResult.__v
    }
})

const User = mongoose.model('user', userSchema)

module.exports = User