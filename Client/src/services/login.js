import axios from 'axios'

const baseUrl = '/api/login'

/**
 * Logs a user in and returns the logged in user.
 *
 * @param {Object} credentials - The user's credentials
 * @param {string} credentials.username - The user's username
 * @param {string} credentials.password - The user's password
 * @returns {Promise<Object>} The logged in user
 */
const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
