/**
 * Controller for testing routes.
 */
const testingRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

/**
 * Handler for resetting the database.
 * 
 * Deletes all blogs and users from the database.
 * 
 * @returns {Promise<void>}
 */
testingRouter.post("/reset", async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

module.exports = testingRouter;
