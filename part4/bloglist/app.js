const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const config = require('./config/config')

const app = express()
app.use(express.json())
app.use('/api', blogRouter)
app.use('/api', usersRouter)
app.use('/api', loginRouter)

mongoose.connect(config.MONGODB_CONNECT_STRING, { family: 4 })

module.exports = app
