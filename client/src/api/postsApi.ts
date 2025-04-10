import axios from 'axios';
import { IPost } from '../types';
import { handleApiError } from './utils';

export const getAllPosts = async (): Promise<IPost[]> => {
  try {
    let allPosts: IPost[] = [];
    let pageNumber = 1;
    let totalPages = 1;

    while (pageNumber <= totalPages) {
      const response = await axios.get(
        `http://localhost:5017/api/Blog/all-posts?pageNumber=${pageNumber}`,
      );
      const { posts, pagination } = response.data;

      allPosts = [...allPosts, ...posts];
      totalPages = pagination.totalPages;
      pageNumber++;
    }

    return allPosts;
  } catch (err) {
    console.error(
      'Error fetching all posts:',
      axios.isAxiosError(err) ? err.message : 'Unknown error',
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
  } catch (err) {
    console.error(
      'Error fetching posts:',
      axios.isAxiosError(err) ? err.message : 'Unknown error',
    );
    return { posts: [], pagination: null };
  }
};

export const getPost = async (slug: string) => {
  try {
    const response = await axios.get(`http://localhost:5017/api/Blog/${slug}`);
    return response.data;
  } catch (err) {
    handleApiError(err);
  }
};

export const deletePost = async (id: number) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(
      `http://localhost:5017/api/Blog/delete-post/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.status !== 200 || response.data.error) {
      throw new Error(response.data.error || 'Failed to fetch the post.');
    }
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(
      'Error deleting post:',
      axios.isAxiosError(err) ? err.message : 'An unexpected error occurred.',
    );
    throw err;
  }
};

export const sendPost = async (postToSend: object) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(
      'http://localhost:5017/api/Blog/create-post',
      postToSend,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (err) {
    handleApiError(err);
  }
};
// to do
export const updatePost = async (id: number, updatedValues: object) => {
  const token = localStorage.getItem('token');

  await axios
    .post(`http://localhost:5017/api/Blog/update-post/${id}`, updatedValues, {
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
