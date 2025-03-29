import axios from 'axios'

export const loginRequest = async (username: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:5017/api/Auth/login', {
      username,
      password,
    })
    console.log('Response from API:', response)
    return response.data
  } catch (error) {
    throw new Error(`Error logging in: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
export const registerRequest = async (email: string, username: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:5017/api/Auth/register', {
      username,
      email,
      password,
    })
    console.log('Response from API:', response)
    return response.data
  } catch (error) {
    throw new Error(`Error logging in: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
