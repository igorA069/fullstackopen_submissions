const bcrypt = require("bcrypt");

const User = require("../models/user");
const usersRouter = require("express").Router();

const config = require("../config/config");

usersRouter.post("/users", async (request, response, next) => {
  if (request.body) {
    if (
      request.body.password === undefined ||
      request.body.password.length < config.MIN_RAW_PASSWORD_LENGTH
    ) {
      return response.status(400).json({
        error: `Password must be given and be at least ${config.MIN_RAW_PASSWORD_LENGTH} characters long`,
      });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(request.body.password, saltRounds);
    const newUser = new User({
      username: request.body.username,
      name: request.body.name,
      hashedPassword,
    });
    try {
      await newUser.save();
    } catch (error) {
      if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
      } else if (
        error.name === "MongoServerError" &&
        error.message.includes("E11000 duplicate key error")
      ) {
        return response.status(400).json({ error: error.message });
      }
      next(error);
    }
    response.status(201).end();
  }
});

usersRouter.get("/users", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });
  response.json(users);
});

usersRouter.get("/users/:id", async (request, response) => {
  const user = await User.findById(request.params.id).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });
  response.json(user);
});

module.exports = usersRouter;
