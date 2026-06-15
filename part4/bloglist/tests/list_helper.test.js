const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const Blog = require('../models/blog')

test('dummy returns one', () => {
    const blogs = []
    assert.strictEqual(listHelper.dummy(blogs), 1)
})

describe('totalLikes tests', () => {
    test('totalLikes of empty array is 0', () => {
        const blogs = []
        assert.strictEqual(listHelper.totalLikes(blogs), 0)
    })

    test('totalLikes of an array with 1 element equals the likes of that element', () => {
        const likesCount = 13
        const blogs = [
            new Blog({
                title: "some title",
                author: "some author",
                url: "www.example.com",
                likes: likesCount
            })]
        assert.strictEqual(listHelper.totalLikes(blogs), likesCount)
    })

    test('totalLikes of an array with multiple elements equals the sum of likes of those elements', () => {
        const likesCount1 = 190
        const likesCount2 = 1301
        const blogs = [
            new Blog({
                title: "some title",
                author: "some author",
                url: "www.example.com",
                likes: likesCount1
            }),
            new Blog({
                title: "another title",
                author: "another author",
                url: "www.helloworld.com",
                likes: likesCount2
            })
        ]
        assert.strictEqual(listHelper.totalLikes(blogs), likesCount1 + likesCount2)
    })
})

describe('favoriteBlog tests', () => {
    test('favoriteBlog of empty array is null', () => {
        const blogs = []
        assert.deepStrictEqual(listHelper.favoriteBlog(blogs), null)
    })

    test('favoriteBlog of an array with 1 element equals that element', () => {
        const likesCount = 13
        const blogs = [
            new Blog({
                title: "some title",
                author: "some author",
                url: "www.example.com",
                likes: likesCount
            })]
        assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[0])
    })

    test('favoriteBlog of an array with multiple elements equals the blog with the most likes', () => {
        const likesCount1 = 190
        const likesCount2 = 1301
        const blogs = [
            new Blog({
                title: "some title",
                author: "some author",
                url: "www.example.com",
                likes: likesCount1
            }),
            new Blog({
                title: "another title",
                author: "another author",
                url: "www.helloworld.com",
                likes: likesCount2
            })
        ]
        assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[1])
    })

    test('favoriteBlog of an array with multiple elements equals the blog with the most likes', () => {
        const likesCount1 = 190
        const likesCount2 = 1301
        const blogs = [
            new Blog({
                title: "another title",
                author: "another author",
                url: "www.helloworld.com",
                likes: likesCount2
            }),
            new Blog({
                title: "some title",
                author: "some author",
                url: "www.example.com",
                likes: likesCount1
            })
        ]
        assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[0])
    })

})

