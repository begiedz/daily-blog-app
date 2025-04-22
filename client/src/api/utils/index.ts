import { AxiosError, AxiosResponse } from 'axios';
import { setNotification } from '../../store/notificationStore';

interface ApiResponse {
  message?: string;
}

export const handleApiSuccess = (res: AxiosResponse) => {
  const status = res?.status || 200;
  const message = res?.data?.message || 'Success';
  setNotification({
    status,
    message,
    type: 'success',
  });
};

export const handleApiError = (err: AxiosError) => {
  const data = err.response?.data as ApiResponse;
  const status = err.response?.status || 500;
  const message = data?.message || err.message || 'Unexpected error occurred.';

  setNotification({
    status,
    message,
    type: 'error',
  });
};
