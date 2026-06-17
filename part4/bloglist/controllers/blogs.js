const Blog = require('../models/blog')
const User = require('../models/user')

const blogRouter = require('express').Router()

blogRouter.get('/blogs', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username:1, name:1, id:1})
  response.json(blogs)
})

blogRouter.post('/blogs', async (request, response, next) => {
  const blog = new Blog(request.body)
  if (blog.likes === undefined) {
    blog.likes = 0
  }
  try {
    // Link to first user
    const users = await User.find({})
    const user = users[0]
    blog.user = user._id
    const result = await blog.save()
    
    // Link that user to this blog
    user.blogs = user.blogs.concat(blog._id)
    await users[0].save()

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