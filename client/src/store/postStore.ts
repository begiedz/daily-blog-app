import { Store } from '@tanstack/react-store';
import { IPostPreview } from './types';

export const postsStore = new Store<IPostPreview[]>([]);

export const loadingPostsStore = new Store<boolean>(false);
