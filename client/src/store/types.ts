export type TRole = 'user' | 'author' | 'admin';

export interface IUser {
  username: string;
  role: TRole;
}

export type TUser = IUser | null;

export interface IAuthState {
  user: IUser | null;
  isAuthenticated: boolean;
}

export interface IPost {
  slug: string;
  img?: string;
  title: string;
  author: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
}
