import axios from 'axios';
import { IApiError } from '../../types';
import { setErrorState } from '../../store/errorStore';

export const handleApiError = (err: unknown): never => {
  if (axios.isAxiosError(err) && err.response) {
    const { status, data } = err.response;
    console.error(status, data);
    throw {
      status,
      message: data?.message || 'An unexpected error occurred.',
    };
  }
  throw {
    status: 500,
    message: 'No connection to server. Please try again later.',
  };
};

const isApiError = (err: unknown): err is IApiError => {
  return (
    typeof err === 'object' &&
    err !== null &&
    'status' in err &&
    'message' in err &&
    typeof (err as IApiError).status === 'number' &&
    typeof (err as IApiError).message === 'string'
  );
};

export const setApiError = (err: unknown) => {
  if (isApiError(err)) {
    setErrorState(err);
  }
};
