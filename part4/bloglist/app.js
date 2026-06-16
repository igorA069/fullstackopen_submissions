const express = require('express')
const mongoose = require('mongoose')

const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

const config = require('./config/config')

const app = express()
app.use(express.json())
app.use('/api', blogRouter)
app.use('/api', usersRouter)

mongoose.connect(config.MONGODB_CONNECT_STRING, { family: 4 })

module.exports = app
