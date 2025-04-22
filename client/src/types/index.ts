import { JSX } from 'react';

export enum ERole {
  GUEST = 'guest',
  USER = 'user',
  AUTHOR = 'author',
  ADMIN = 'admin',
}

export type TRole = `${ERole}`;

export interface IPost {
  id: number;
  slug: string;
  title: string;
  createdAt: string;
  content: string;
  excerpt: string;
  tags: string[];
  author: string;
  modifiedAt?: string | null;
  modifiedBy?: string | null;
  imageUrl?: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string | null;
  role: TRole;
}

export type TUser = IUser | null;

export interface ITokenPayload {
  unique_name: string;
  role: TRole;
  nameid: string;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}

export interface IHandleLoginProps {
  username: string;
  password: string;
}

export interface IHandleRegisterProps extends IHandleLoginProps {
  email: string;
}

export interface IAuthState {
  user: TUser;
  isAuthenticated: boolean;
}

export interface IAppRoute {
  name: string;
  path: string;
  pageElement: JSX.Element;
  role: TRole[];
  includeInMenu?: boolean;
  icon?: string;
}

export interface IApiError {
  status: number;
  message: string;
}

export interface IApiErrorState {
  error: IApiError | null;
}
