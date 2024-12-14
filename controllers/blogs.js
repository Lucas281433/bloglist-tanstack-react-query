/**
 * Router for handling requests related to blogs.
 */

const blogsRouter = require("express").Router();
const middleware = require("../utils/middleware");
const Blog = require("../models/blog");

/**
 * Handler for getting all blogs.
 *
 * @returns {Promise<Blog[]>} A list of blogs.
 */
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

/**
 * Handler for creating a new blog.
 *
 * @param {Object} request.body - Data of the blog to create.
 * @param {string} request.body.title - Title of the blog.
 * @param {string} request.body.author - Author of the blog.
 * @param {string} request.body.url - URL of the blog.
 * @param {number} request.body.likes - Number of likes of the blog.
 *
 * @returns {Promise<Blog>} The created blog.
 */
blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;

  const user = request.user;

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  });

  if (!blog.title || !blog.url) {
    response.status(400).end();
  }

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

/**
 * Handler for deleting a blog.
 *
 * @param {string} request.params.id - ID of the blog to delete.
 *
 * @returns {Promise<void>}
 */
blogsRouter.delete("/:id", middleware.userExtractor, async (request, response) => {
    const user = request.user;

    const blog = await Blog.findById(request.params.id);

    if (blog.user._id.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    }
    response
      .status(400)
      .json({ error: "Only the user who created the blog can delete it" });
});

/**
 * Handler for updating a blog.
 *
 * @param {string} request.params.id - ID of the blog to update.
 * @param {Object} request.body - Data of the blog to update.
 * @param {string} request.body.title - Title of the blog.
 * @param {string} request.body.author - Author of the blog.
 * @param {string} request.body.url - URL of the blog.
 * @param {number} request.body.likes - Number of likes of the blog.
 *
 * @returns {Promise<Blog>} The updated blog.
 */
blogsRouter.put("/:id", middleware.userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;
  const user = request.user

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes, user: user.id },
    { new: true }
  );
  response.json(updatedBlog);
});

module.exports = blogsRouter;
