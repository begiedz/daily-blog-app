import axios from 'axios';
import { handleApiError } from './utils';

export const getAllUsers = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get('http://localhost:5017/api/Users', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteUser = async (id: number) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.delete(
      `http://localhost:5017/api/Users/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateUserRole = async (id: number, role: string) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.put(
      `http://localhost:5017/api/Users/${id}/role`,
      role,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getUserProfile = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(
      'http://localhost:5017/api/Users/get-my-profile',
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateUserProfile = async (email: string, password: string) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.put(
      'http://localhost:5017/api/Users/update-my-account',
      { email, password },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
