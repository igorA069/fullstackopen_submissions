const checkHasBody = (req, res, next) => {
    if (req.body == null) {
        return res.status(400).json({'error': 'request body missing'})
    }
    next()
}

module.exports = { checkHasBody }