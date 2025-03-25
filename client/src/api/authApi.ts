import axios from 'axios'

export const loginRequest = async (username: string, password: string) => {
  try {
    const response = await axios.post('localhost:5000/api/auth/login', { username, password })
    return response.data
  } catch (error) {
    throw new Error(`Error logging in: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
