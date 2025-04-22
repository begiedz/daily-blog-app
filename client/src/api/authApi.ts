import axios from 'axios';
import config from '../appconfig.json';
import { handleApiError } from './utils';

export const loginRequest = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${config.serverUrl}/Auth/login`, {
      username,
      password,
    });
    console.log('Response from API:', response);
    return response.data;
  } catch (err) {
    handleApiError(err);
  }
};

export const registerRequest = async (
  username: string,
  email: string,
  password: string,
) => {
  try {
    const response = await axios.post(`${config.serverUrl}/Auth/register`, {
      username,
      email,
      password,
    });
    console.log('Response from API:', response);
    return response.data;
  } catch (err) {
    handleApiError(err);
  }
};
