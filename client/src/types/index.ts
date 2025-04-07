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
  imgUrl: string;
  createdAt: string;
  content: string;
  excerpt: string;
  tags: string[];
  author: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
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
  setError: (error: string) => void;
}

export interface IHandleRegisterProps extends IHandleLoginProps {
  email: string;
}

export interface IAuthState {
  user: IUser | null;
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
