export enum ERole {
  GUEST = 'guest',
  USER = 'user',
  AUTHOR = 'author',
  ADMIN = 'admin',
}

export type TRole = `${ERole}`;

export interface IUser {
  username: string;
  role: TRole;
}

export type TUser = IUser | null;

export interface IAuthState {
  user: IUser | null;
  isAuthenticated: boolean;
}

export interface IPostPreview {
  slug: string;
  imgUrl?: string;
  title: string;
  author: string;
  excerpt: string;
  createdAt: string;
  tags: string[];
}
