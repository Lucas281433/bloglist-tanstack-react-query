import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

/**
 * Sets the authentication token for subsequent requests.
 * Prepends 'Bearer ' to the provided token string and stores it.
 *
 * @param {string} newToken - The token string to be set for authorization.
 */
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

/**
 * Fetches all blog posts from the server.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of blog posts.
 */
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

/**
 * Sends a POST request to create a new blog post on the server.
 * Includes the authorization token in the request headers.
 *
 * @param {Object} newBlog - The blog post data to be created.
 * @returns {Promise<Object>} A promise that resolves to the created blog post data.
 */
const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

/**
 * Sends a PUT request to update an existing blog post on the server.
 * Includes the authorization token in the request headers.
 *
 * @param {Object} blog - The blog post data to be updated, must include an `id` property.
 * @returns {Promise<Object>} A promise that resolves to the updated blog post data.
 */
const update = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

/**
 * Sends a DELETE request to remove a blog post with the given id from the server.
 * Includes the authorization token in the request headers.
 *
 * @param {string} id - The id of the blog post to remove.
 * @returns {Promise<Object>} A promise that resolves to the removed blog post data.
 */
const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

/**
 * Sends a POST request to add a new comment to a blog post with the given id.
 * Includes the authorization token in the request headers.
 *
 * @param {string} id - The id of the blog post to add a comment to.
 * @param {string} comment - The comment to add.
 * @returns {Promise<Object>} A promise that resolves to the updated blog post data.
 */
const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment } , config)
  return response.data
}

export default { getAll, create, update, remove, setToken, addComment }
