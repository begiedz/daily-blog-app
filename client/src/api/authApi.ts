import axios from 'axios';

export const loginRequest = async (username: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:5017/api/Auth/login', {
      username,
      password,
    });
    console.log('Response from API:', response);
    return response.data;
  } catch (err) {
    throw new Error(
      `Error logging in: ${
        axios.isAxiosError(err) ? err.message : 'Unknown error'
      }`,
    );
  }
};

export const registerRequest = async (
  username: string,
  email: string,
  password: string,
) => {
  try {
    const response = await axios.post(
      'http://localhost:5017/api/Auth/register',
      {
        username,
        email,
        password,
      },
    );
    console.log('Response from API:', response);
    return response.data;
  } catch (err) {
    throw new Error(
      `Error while registering: ${
        axios.isAxiosError(err) ? err.message : 'Unknown error'
      }`,
    );
  }
};
