const jwt = require('jsonwebtoken')

const config = require('../config/config')

const extractUser = async (req, res, next) => {
    const authorization = req.get('authorization')
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).end()
    }
    const encodedToken = authorization.replace('Bearer ', '')
    const decodedToken = await jwt.verify(encodedToken, config.AUTH_TOKEN_SECRET) // may throw JsonWebTokenError or TokenExpiredError
    req.usernameInToken = decodedToken.username
    next()
}

module.exports = { extractUser }