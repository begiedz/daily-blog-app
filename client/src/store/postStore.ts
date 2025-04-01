import { Store } from '@tanstack/react-store';

interface IPost {
  id: number;
  title: string;
  subject: string;
  snippet: string;
  date: Date;
  img?: string;
}

export const postsStore = new Store<IPost[] | []>([]);

export const loadingPostsStore = new Store<boolean>(false);
