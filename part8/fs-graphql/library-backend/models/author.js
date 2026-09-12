const { mongoose } = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 4,
    unique: true,
    required: true,
  },
  born: Number,
  bookCount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Author", authorSchema);
