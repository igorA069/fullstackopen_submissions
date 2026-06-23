const Blog = require('../models/blog')
const User = require('../models/user')

const requestValidator = require('../middleware/requestValidator')
const userExtractor = require('../middleware/userExtractor')
const { errorHandler } = require('../middleware/errorHandler')

const blogRouter = require('express').Router()

blogRouter.get('/blogs', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username:1, name:1, id:1})
  response.json(blogs)
})

blogRouter.post('/blogs', requestValidator.checkHasBody, userExtractor, async (request, response, next) => {
  const blog = new Blog(request.body)
  if (blog.likes === undefined) {
    blog.likes = 0
  }
  try {
    // Link to user referenced in the token
    const user = await User.findOne({username: request.user})
    if (!user) {
      return response.status(400).json({'error': 'invalid_grant'})
    }

    blog.user = user._id
    const result = await blog.save()  // may throw a ValidationError
    
    // Link that user to this blog
    if (user.blogs === undefined) {
      user.blogs = [blog._id]
    } else {
      user.blogs = user.blogs.concat(blog._id)
    }
    await user.save() // may throw a ValidationError

    return response.status(201).json(result)
  } catch (error) {
    if (error.name === "ValidationError") {
      return response.status(400).json({'error': error.message})
    } 
    next(error)
  }
})

blogRouter.delete('/blogs/:id', userExtractor, async (request, response) => {
  const foundBlog = await Blog.findById(request.params.id)
  if (!foundBlog) {
    return response.status(404).json({'error': 'resource not found'})
  } 
  const userIdFromBlog = (
    foundBlog.user?._id ||  // if blog is populated with user
    foundBlog.user)         // if blog.user is just an id

  const userFromTokenInDb = await User.findOne({ username: request.user })
  if (!userFromTokenInDb) {
    return response.status(403).json({'error': 'token references unknown user'})
  }

  // check if the requesting user is the one who created the document
  if (userIdFromBlog?.toString() !== userFromTokenInDb._id.toString()) {
    return response.status(403).json({'error': 'user requesting deletion must be the creator of the resource'})
  }
  await foundBlog.deleteOne()
  response.status(204).end()
})

blogRouter.put('/blogs/:id', requestValidator.checkHasBody, async (request, response) => {
  const blogToUpdate = await Blog.findById(request.params.id)

  // For now, assuming that only the like counts get updated
  blogToUpdate.likes = request.body.likes
  await blogToUpdate.save()
  response.status(200).end()
})

blogRouter.use(errorHandler)

module.exports = blogRouter