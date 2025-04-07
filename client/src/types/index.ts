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
  role: string;
}
