import axios, { AxiosError, AxiosResponse } from 'axios';
import { setNotification } from '../../store/notificationStore';

interface ApiResponse {
  message?: string;
  title?: string;
  errors?: Record<string, string[]>;
}

export const handleApiNotify = (
  resOrErr: AxiosResponse | AxiosError | unknown,
) => {
  if (axios.isAxiosError(resOrErr)) {
    const err = resOrErr as AxiosError;
    const data = err.response?.data as ApiResponse;

    // image error for creating a post
    const imageError = data?.errors?.Image?.[0];

    setNotification({
      status: err.response?.status || 500,
      message:
        imageError ||
        data?.message ||
        data?.title ||
        err.message ||
        'Unexpected error occurred.',
      type: 'error',
    });
  } else if ((resOrErr as AxiosResponse)?.status) {
    const res = resOrErr as AxiosResponse;
    const data = res.data as ApiResponse;

    setNotification({
      status: res.status,
      message: data?.message || 'Success.',
      type: 'success',
    });
  }
};
