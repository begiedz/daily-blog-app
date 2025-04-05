import axios from 'axios';
import { postsStore } from '../store/postStore';

export const getPosts = async () => {
  try {
    const response = await axios.get(
      'http://localhost:5017/api/Blog/all-posts',
    );
    postsStore.setState(() => response.data);
    console.log('getPosts response: ', response.data);
  } catch (error) {
    console.error(
      'Error fetching posts:',
      error instanceof Error ? error.message : 'Unknown error',
    );
  }
};
