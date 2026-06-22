const errorHandler = (error, req, res, next) => {
    if (error.name === 'JsonWebTokenError' || 
        error.name === 'TokenExpiredError'
    ) {
        return res.status(400).json({'error': 'invalid_grant'})
    }
    next(error)
}

module.exports = {errorHandler}