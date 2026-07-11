const Blog = require('../models/blog')
const User = require('../models/user')

const testingRouter = require('express').Router()

testingRouter.post('/reset', async (req, resp) => {
    await User.deleteMany({})
    await Blog.deleteMany({})
    resp.status(204).end()
})

module.exports = testingRouter