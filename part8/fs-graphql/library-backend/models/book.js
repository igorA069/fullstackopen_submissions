const { mongoose } = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    unique: true,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  published: {
    type: Number,
    required: true,
  },
  genres: [String],
});

module.exports = mongoose.model("Book", bookSchema);
