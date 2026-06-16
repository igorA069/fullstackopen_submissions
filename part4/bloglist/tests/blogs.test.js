const { test, after, beforeEach } = require('node:test')
const assert = require('assert')
const supertest = require('supertest')

const mongoose = require('mongoose')

const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const { testBlogs, getStoredBlogs } = require('./test_helper')

const initialBlogCount = 2
const initialBlogs = testBlogs.slice(0,2)

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
  const newBlog = testBlogs[initialBlogCount]
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const storedBlogs = await getStoredBlogs()
  // Check that the element count is incremented 
  assert.strictEqual(storedBlogs.length, initialBlogCount + 1)
  // Check that the new id is present
  const storedIds = storedBlogs.map(blog => blog.id)
  assert.ok(storedIds.includes(newBlog._id))
})

test('If a blog post without "likes" property is added, it defaults to 0', async () => {
  const newBlog = { ...testBlogs[initialBlogCount] }
  // Artificially remove the property
  delete newBlog.likes
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const storedBlogs = await getStoredBlogs()
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
  const newBlog = { ...testBlogs[initialBlogCount] }
  // Artificially remove the property
  delete newBlog.title
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('Attempt to add a blog post without url results in a 400 error', async () => {
  const newBlog = { ...testBlogs[initialBlogCount] }
  // Artificially remove the property
  delete newBlog.url
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('Delete a blog post', async () => {
  const blogId = initialBlogs[0]._id
  await api
    .delete(`/api/blogs/${blogId}`)
    .expect(204)

  const allBlogs = await getStoredBlogs()
  // Check that the count is decremented
  assert.strictEqual(allBlogs.length, initialBlogCount - 1)
  // Check that the id is no longer present
  assert.ok(!allBlogs.map(blog => blog.id).includes(blogId))
})

after(async () => {
    await mongoose.connection.close()
})