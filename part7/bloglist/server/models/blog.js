const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  url: {
    type: String,
    required: true,
  },
  likes: Number,
  comments: [String],
});

blogSchema.set("toJSON", {
  transform: (object, result) => {
    result.id = object._id.toString();
    delete result._id;
    delete result.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
