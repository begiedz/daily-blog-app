import { jwtDecode } from 'jwt-decode';
import { loginRequest, registerRequest } from '../api/authApi';
import { authStore, setUserState } from '../store/authStore';
import {
  IHandleLoginProps,
  IHandleRegisterProps,
  ITokenPayload,
} from '../types';

import { handleApiNotify } from '../api/utils';

const setNewUser = (decoded: ITokenPayload) => ({
  id: parseInt(decoded.nameid),
  name: decoded.unique_name,
  email: '',
  role: decoded.role,
});

export const handleLogin = async ({
  username,
  password,
}: IHandleLoginProps) => {
  const res = await loginRequest(username, password);
  const { token } = res!.data;
  const decoded = jwtDecode<ITokenPayload>(token);
  const newUser = setNewUser(decoded);

  setUserState(newUser);
  localStorage.setItem('token', token);

  return res;
};

export const handleRegister = async ({
  username,
  email,
  password,
}: IHandleRegisterProps) => {
  const res = await registerRequest(username, email, password);
  return res;
};

export const authOnEntry = () => {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const decoded = jwtDecode<ITokenPayload>(token);

    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < now) {
      console.warn('Token expired');
      localStorage.removeItem('token');
      setUserState(null);
      return;
    }

    const newUser = setNewUser(decoded);

    setUserState(newUser);
    localStorage.setItem('token', token);
  } catch (err) {
    handleApiNotify(err);
    console.error('Invalid token', err);
    localStorage.removeItem('token');
    setUserState(null);
  }
};

export const handleLogout = () => {
  authStore.setState(prevState => ({
    ...prevState,
    user: null,
    isAuthenticated: false,
  }));
  localStorage.removeItem('token');
  window.location.reload();
};
