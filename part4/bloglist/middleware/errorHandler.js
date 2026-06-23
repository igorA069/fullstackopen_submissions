const errorHandler = (error, req, res, next) => {
    if (error.name === 'JsonWebTokenError' || 
        error.name === 'TokenExpiredError'
    ) {
        return res.status(400).json({'error': 'invalid_grant'})
    }
    if (error.name === 'CastError') {
        return res.status(404).json({'error': 'resource not found'})
    }
    next(error)
}

module.exports = {errorHandler}