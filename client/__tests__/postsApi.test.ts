import axios from 'axios';
import {
  getAllPosts,
  getMyPosts,
  getPosts,
  getPost,
  deletePost,
  sendPost,
  updatePost,
} from '../src/api/postsApi';
import { handleApiNotify } from '../src/api/utils';

jest.mock('axios');
jest.mock('../src/api/utils');

describe('postsApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem('token', 'mocked-token');
  });

  describe('getAllPosts', () => {
    it('should fetch paginated posts until all are retrieved', async () => {
      (axios.get as jest.Mock)
        .mockResolvedValueOnce({
          data: {
            posts: ['page1'],
            pagination: { totalPages: 2 },
          },
        })
        .mockResolvedValueOnce({
          data: {
            posts: ['page2'],
            pagination: { totalPages: 2 },
          },
        });

      const res = await getAllPosts();

      expect(res).toEqual(['page1', 'page2']);
      expect(axios.get).toHaveBeenCalledTimes(2);
    });

    it('should return empty array on error', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('fail'));
      const res = await getAllPosts();
      expect(res).toEqual([]);
    });
  });

  // ######################

  describe('getMyPosts', () => {
    it('should fetch my posts with token', async () => {
      (axios.get as jest.Mock).mockResolvedValue({ data: ['myPost'] });

      const res = await getMyPosts();

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('/my-posts'),
        {
          headers: { Authorization: 'Bearer mocked-token' },
        },
      );
      expect(res).toEqual(['myPost']);
    });

    it('should handle error and call handleApiNotify', async () => {
      const error = new Error('unauthorized');
      (axios.get as jest.Mock).mockRejectedValue(error);

      await getMyPosts();

      expect(handleApiNotify).toHaveBeenCalledWith(error);
    });
  });

  // ######################

  describe('getPosts', () => {
    it('should return posts and pagination', async () => {
      (axios.get as jest.Mock).mockResolvedValue({
        data: { posts: ['p1'], pagination: { totalPages: 1 } },
      });

      const res = await getPosts(1, 7);

      expect(res.posts).toEqual(['p1']);
      expect(res.pagination).toEqual({ totalPages: 1 });
    });

    it('should return empty structure on error', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('fail'));
      const res = await getPosts(1, 7);
      expect(res).toEqual({ posts: [], pagination: null });
    });
  });

  // ######################

  describe('getPost', () => {
    it('should return post data by slug', async () => {
      (axios.get as jest.Mock).mockResolvedValue({ data: 'postData' });

      const res = await getPost('example-slug');

      expect(res).toBe('postData');
    });

    it('should handle error', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('not found'));

      await getPost('example-slug');

      expect(handleApiNotify).toHaveBeenCalled();
    });
  });

  // ######################

  describe('deletePost', () => {
    it('should delete post by id', async () => {
      (axios.delete as jest.Mock).mockResolvedValue({ status: 200, data: {} });

      const res = await deletePost(1);

      expect(res?.status).toBe(200);
    });

    it('should handle error', async () => {
      const error = new Error('delete error');
      (axios.delete as jest.Mock).mockRejectedValue(error);

      await deletePost(999);

      expect(handleApiNotify).toHaveBeenCalledWith(error);
    });
  });

  // ######################

  describe('sendPost', () => {
    it('should send post with authorization', async () => {
      const payload = { title: 'New Post' };
      (axios.post as jest.Mock).mockResolvedValue({ data: 'created' });

      const res = await sendPost(payload);

      expect(res?.data).toBe('created');
    });

    it('should handle error', async () => {
      (axios.post as jest.Mock).mockRejectedValue(new Error('fail'));

      await sendPost({ title: 'fail' });

      expect(handleApiNotify).toHaveBeenCalled();
    });
  });

  // ######################

  describe('updatePost', () => {
    it('should update post by id', async () => {
      const data = { title: 'Updated' };
      (axios.put as jest.Mock).mockResolvedValue({ data: 'updated' });

      const res = await updatePost(2, data);

      expect(res?.data).toBe('updated');
    });

    it('should handle error', async () => {
      (axios.put as jest.Mock).mockRejectedValue(new Error('fail'));

      await updatePost(2, { title: 'fail' });

      expect(handleApiNotify).toHaveBeenCalled();
    });
  });
});
