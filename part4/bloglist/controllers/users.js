const bcrypt = require('bcrypt')

const User = require('../models/user')
const usersRouter = require('express').Router()

usersRouter.post('/users', async (request, response) => {
    if (request.body)
    {   
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(request.body.password, saltRounds)
        const newUser = new User({
            username: request.body.username,
            name: request.body.name,
            hashedPassword
        })
        await newUser.save()
        response.status(201).end()
    }
})

usersRouter.get('/users', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

module.exports = usersRouter 