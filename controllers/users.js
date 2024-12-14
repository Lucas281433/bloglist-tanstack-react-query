/**
 * Controller for handling user routes.
 */
const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

/**
 * Handler for creating a new user.
 * 
 * @param {Object} request.body - User data.
 * @param {string} request.body.username - Username.
 * @param {string} request.body.name - Name.
 * @param {string} request.body.password - Password.
 * 
 * @returns {Promise<Object>} The created user.
 */
usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (username.length < 3 || password.length < 3) {
    response
      .status(400)
      .json({ error: "Username and password must be at least 3 characters" })
      return
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

/**
 * Handler for getting all users.
 * 
 * @returns {Promise<Array<Object>>} An array of users.
 */
usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.status(200).json(users);
});

module.exports = usersRouter;
