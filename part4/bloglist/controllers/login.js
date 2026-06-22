const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../config/config')

const requestValidator = require('../middleware/requestValidator')

loginRouter.post('/login', requestValidator.checkHasBody, async (request, response) => {
    const username = request.body.username
    const password = request.body.password
    
    // check if username is in db
    const foundUser = await User.findOne({username})
    if (!foundUser) {
        return response.status(401).send({'error':'invalid_client'})
    } 
    const isPasswordCorrect = await bcrypt.compare(password, foundUser.hashedPassword)
    if (isPasswordCorrect) {
        const expiresIn = '1h'
        const token = {'username':username }
        const signedToken = await jwt.sign(token, config.AUTH_TOKEN_SECRET, { expiresIn })

        return response.status(200).json({'accessToken': signedToken, 'tokenType':'Bearer', expiresIn })
    } else {
        return response.status(401).send({'error':'invalid_grant'})
    }
    
})

module.exports = loginRouter