import axios from 'axios';

export const handleApiError = (err: unknown): never => {
  if (axios.isAxiosError(err) && err.response?.data?.message) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
  throw new Error('An unexpected error occurred.');
};
