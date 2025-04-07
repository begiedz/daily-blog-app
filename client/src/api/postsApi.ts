import axios from 'axios';
import { IPost } from './types';

export const getAllPosts = async (): Promise<IPost[]> => {
  try {
    let allPosts: IPost[] = [];
    let pageNumber = 1;
    let totalPages = 1;

    while (pageNumber <= totalPages) {
      const response = await axios.get(
        `http://localhost:5017/api/Blog/all-posts?pageNumber=${pageNumber}&pageSize=7`,
      );
      const { posts, pagination } = response.data;

      allPosts = [...allPosts, ...posts];
      totalPages = pagination.totalPages;
      pageNumber++;
    }

    return allPosts;
  } catch (error) {
    console.error(
      'Error fetching all posts:',
      error instanceof Error ? error.message : 'Unknown error',
    );
    return [];
  }
};

export const getPosts = async (pageNumber = 1, pageSize = 7) => {
  try {
    const response = await axios.get(
      `http://localhost:5017/api/Blog/all-posts?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    );
    console.log('getPosts response: ', response.data);
    return {
      posts: response.data.posts,
      pagination: response.data.pagination,
    };
  } catch (error) {
    console.error(
      'Error fetching posts:',
      error instanceof Error ? error.message : 'Unknown error',
    );
    return { posts: [], pagination: null };
  }
};

export const getPost = async (slug: string) => {
  try {
    const response = await axios.get(`http://localhost:5017/api/Blog/${slug}`);
    if (response.status !== 200 || response.data.error) {
      throw new Error(response.data.error || 'Failed to fetch the post.');
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching post:',
      error instanceof Error ? error.message : 'Unknown error',
    );
    throw error;
  }
};

export const sendPost = async (postToSend: object) => {
  const token = localStorage.getItem('token');

  await axios
    .post('http://localhost:5017/api/Blog/create-post', postToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};
// to do
export const updatePost = async (updatedValues: object) => {
  const token = localStorage.getItem('token');

  await axios
    .post('http://localhost:5017/api/Blog/create-post', updatedValues, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};
