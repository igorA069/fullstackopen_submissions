const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: Number,
})

blogSchema.set('toJSON', {
  transform: (object, result) => {
    result.id = object._id.toString()
    delete result._id
    delete result.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog