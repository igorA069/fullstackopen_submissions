const Blog = require('../models/blog')

const blogRouter = require('express').Router()

blogRouter.get('/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/blogs', async (request, response, next) => {
  const blog = new Blog(request.body)
  if (blog.likes === undefined) {
    blog.likes = 0
  }
  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch (error) {
    if (error.name === "ValidationError") {
      return response.status(400).json({'error': error.message})
    } 
    next(error)
  }
})

module.exports = blogRouter