import axios from 'axios';

export const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    throw new Error(error.response.data.message);
  }
  throw new Error('An unexpected error occurred.');
};
