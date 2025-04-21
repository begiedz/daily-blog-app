import { Store } from '@tanstack/react-store';
import { IApiErrorState, IApiError } from '../types';

const initialState: IApiErrorState = {
  error: null,
};

export const errorStore = new Store<IApiErrorState>(initialState);

export const setErrorState = (error: IApiError | null) => {
  console.error('Setting error', error);
  errorStore.setState(prevState => ({
    ...prevState,
    error,
  }));
};
