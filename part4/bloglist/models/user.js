const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
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