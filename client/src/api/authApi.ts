import axios from 'axios';
import config from '../appconfig.json';
import { handleApiNotify } from './utils';

export const loginRequest = async (username: string, password: string) => {
  try {
    return await axios.post(`${config.serverUrl}/Auth/login`, {
      username,
      password,
    });
  } catch (err) {
    handleApiNotify(err);
  }
};

export const registerRequest = async (
  username: string,
  email: string,
  password: string,
) => {
  try {
    return await axios.post(`${config.serverUrl}/Auth/register`, {
      username,
      email,
      password,
    });
  } catch (err) {
    handleApiNotify(err);
  }
};
