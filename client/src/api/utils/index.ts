import axios from 'axios';
import { ApiError } from '../../types';

export const handleApiError = (err: unknown): never => {
  if (axios.isAxiosError(err) && err.response) {
    const { status, data } = err.response;
    console.error(status, data);
    throw { status, message: data?.message || 'An unexpected error occurred.' };
  }
  throw {
    status: 500,
    message: 'No connection to server. Please try again later.',
  };
};

export const isApiError = (err: unknown): err is ApiError => {
  return (
    typeof err === 'object' &&
    err !== null &&
    'status' in err &&
    'message' in err &&
    typeof (err as ApiError).status === 'number' &&
    typeof (err as ApiError).message === 'string'
  );
};
