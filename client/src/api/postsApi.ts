import axios from 'axios';
import { postsStore } from '../store/postStore';

export const getAllPosts = async (pageNumber = 1, pageSize = 7) => {
  try {
    const response = await axios.get(
      `http://localhost:5017/api/Blog/all-posts?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    );
    postsStore.setState(() => response.data.posts);
    console.log('getPosts response: ', response.data);
    return response.data.pagination;
  } catch (error) {
    console.error(
      'Error fetching posts:',
      error instanceof Error ? error.message : 'Unknown error',
    );
  }
};

export const getPost = async (slug: string) => {
  const response = await axios.get(`http://localhost:5017/api/Blog/${slug}`);
  return response.data;
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
