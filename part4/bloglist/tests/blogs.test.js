const { test, after, beforeEach } = require('node:test')
const assert = require('assert')
const supertest = require('supertest')

const mongoose = require('mongoose')

const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

const initialBlogCount = 2
const initialBlogs = blogs.slice(0,2)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

test('GET returns the expected blog posts', async () => {
    const response = await api.get('/api/blogs')
    // Check metadata:
    assert.strictEqual(response.status, 200)
    assert.match(response.type, /application\/json/)
    // Check contents:
    const returnedBlogs = response.body
    assert.notEqual(returnedBlogs, null)
    // Check equality of element count and ids
    assert.strictEqual(returnedBlogs.length, initialBlogs.length)
    const insertedIds = initialBlogs.map(blog => blog._id)
    const returnedIds = returnedBlogs.map(blog => blog.id)
    insertedIds.forEach(id => {
      assert.ok(returnedIds.includes(id))
    })
})

test('Blog posts have an id', async () => {
    const response = await api.get('/api/blogs')
    assert.notEqual(response.body, null)
    response.body.forEach(blog => {
        assert.notStrictEqual(blog.id, undefined)
    })
})

test('POST correctly adds a blog post', async () => {
  const newBlog = blogs[initialBlogCount]
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const storedBlogs = await Blog.find({})
  // Check that the element count is incremented 
  assert.strictEqual(storedBlogs.length, initialBlogCount + 1)
  // Check that the new id is present
  const storedIds = storedBlogs.map(blog => blog.id)
  assert.ok(storedIds.includes(newBlog._id))
})

test('If a blog post without "likes" property is added, it defaults to 0', async () => {
  const newBlog = { ...blogs[initialBlogCount] }
  // Artificially remove the property
  delete newBlog.likes
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const storedBlogs = await Blog.find({})
  // Check that the element count is incremented 
  assert.strictEqual(storedBlogs.length, initialBlogCount + 1)
  // Check that the new id is present
  const storedIds = storedBlogs.map(blog => blog.id)
  assert.ok(storedIds.includes(newBlog._id))
  // Check that the "likes" property is 0
  const matchingStoredBlog = storedBlogs.find(blog => blog.id === newBlog._id)
  assert.strictEqual(matchingStoredBlog.likes, 0)
})

test('Attempt to add a blog post without title results in a 400 error', async () => {
  const newBlog = { ...blogs[initialBlogCount] }
  // Artificially remove the property
  delete newBlog.title
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('Attempt to add a blog post without url results in a 400 error', async () => {
  const newBlog = { ...blogs[initialBlogCount] }
  // Artificially remove the property
  delete newBlog.url
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

after(async () => {
    await mongoose.connection.close()
})