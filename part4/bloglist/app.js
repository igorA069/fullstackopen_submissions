const express = require('express')
const mongoose = require('mongoose')

const blogRouter = require('./controllers/blogs')
const config = require('./config/config')

const app = express()
app.use(express.json())
app.use('/api', blogRouter)

mongoose.connect(config.MONGODB_CONNECT_STRING, { family: 4 })

module.exports = app
