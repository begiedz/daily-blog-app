import axios from 'axios';
import config from '../appconfig.json';
import { handleApiNotify } from './utils';

export const getAllUsers = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${config.serverUrl}/Users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    handleApiNotify(err);
  }
};

export const deleteUser = async (id: number) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.delete(`${config.serverUrl}/Users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    handleApiNotify(err);
  }
};

export const updateUserRole = async (id: number, role: string) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.put(
      `${config.serverUrl}/Users/${id}/role`,
      role,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response;
  } catch (err) {
    handleApiNotify(err);
  }
};

export const getUserProfile = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(
      `${config.serverUrl}/Users/get-my-profile`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (err) {
    handleApiNotify(err);
  }
};

export const updateUserProfile = async (email: string, password: string) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.put(
      `${config.serverUrl}/Users/update-my-account`,
      { email, password },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (err) {
    handleApiNotify(err);
  }
};
