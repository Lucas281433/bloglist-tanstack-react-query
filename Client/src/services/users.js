import axios from 'axios'

const baseUrl = '/api/users'

/**
 * Fetches all users from the server.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of user objects.
 */
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }
