const { mongoose } = require("mongoose");

const connectToDb = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("Successfully connected to DB");
  } catch (e) {
    console.log("Failed to connect to DB", e.message);
  }
};

module.exports = connectToDb;
