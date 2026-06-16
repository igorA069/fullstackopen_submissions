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

blogRouter.delete('/blogs/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/blogs/:id', async (request, response) => {
  const blogToUpdate = await Blog.findById(request.params.id)
  if (request.body != null)
  {
    // For now, assuming that only the like counts get updated
    blogToUpdate.likes = request.body.likes
    await blogToUpdate.save()
    response.status(200).end()
  } else {
    response.status(400).json({'error': 'request body missing'})
  }
})

module.exports = blogRouter