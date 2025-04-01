import { Store } from '@tanstack/react-store';

import { IAuthState, TUser } from './types';
const initialState: IAuthState = {
  user: null,
  isAuthenticated: false,
};

export const authStore = new Store<IAuthState>(initialState);

export const setUserState = (user: TUser) => {
  authStore.setState(prevState => ({
    ...prevState,
    user,
    isAuthenticated: true,
  }));
};
