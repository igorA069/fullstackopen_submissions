const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const newUser = {
    username:'test_username',
    name:'test_name',
    password:'test_password'
}

beforeEach(async () => {
    await User.deleteMany({})
})

describe('User controller tests', () => {
    test('user without username is not accepted', async () => {
        const testUser = {...newUser}
        delete testUser.username
        await api
            .post('/api/users')
            .send(testUser)
            .expect(400)
    })

    test('username shorter than 3 characters is not accepted', async () => {
        const testUser = {...newUser, username:'ab'}
        await api
            .post('/api/users')
            .send(testUser)
            .expect(400)
    })

    test('username with more than 3 characters is accepted', async () => {
        const testUser = {...newUser}
        await api
            .post('/api/users')
            .send(testUser)
            .expect(201)
    })

    test('non-unique username is not accepted', async () => {
        const testUser = {...newUser}
        await api
            .post('/api/users')
            .send(testUser)
            .expect(201)
        // Attempt to add the same user
        await api
            .post('/api/users')
            .send(testUser)
            .expect(400)
    })

    test('user without password is not accepted', async () => {
        const testUser = {...newUser}
        delete testUser.password
        await api
            .post('/api/users')
            .send(testUser)
            .expect(400)
    })

    test('user with password shorter than 3 characters is not accepted', async () => {
        const testUser = {...newUser, password:'ab'}
        await api
            .post('/api/users')
            .send(testUser)
            .expect(400)
    })
})

after(async () => {
    await mongoose.connection.close()
})
