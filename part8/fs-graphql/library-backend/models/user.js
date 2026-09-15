const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
