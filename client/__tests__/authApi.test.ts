import axios from 'axios';
import { loginRequest, registerRequest } from '../src/api/authApi';
import { handleApiNotify } from '../src/api/utils';

jest.mock('axios');
jest.mock('../src/api/utils');

describe('authApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loginRequest', () => {
    it('should send POST request with correct payload', async () => {
      (axios.post as jest.Mock).mockResolvedValue({ data: 'success' });
      const res = await loginRequest('testUser', 'testPass');

      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/Auth/login'),
        { username: 'testUser', password: 'testPass' },
      );
      expect(res).toEqual({ data: 'success' });
    });

    it('should call handleApiNotify on error', async () => {
      const error = new Error('Login failed');
      (axios.post as jest.Mock).mockRejectedValue(error);

      await loginRequest('testUser', 'testPass');

      expect(handleApiNotify).toHaveBeenCalledWith(error);
    });
  });

  // ######################

  describe('registerRequest', () => {
    it('should send POST request with correct payload', async () => {
      (axios.post as jest.Mock).mockResolvedValue({ data: 'registered' });
      const res = await registerRequest(
        'testUser',
        'test@mail.com',
        'testPass',
      );

      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/Auth/register'),
        {
          username: 'testUser',
          email: 'test@mail.com',
          password: 'testPass',
        },
      );
      expect(res).toEqual({ data: 'registered' });
    });

    it('should call handleApiNotify on error', async () => {
      const error = new Error('Registration failed');
      (axios.post as jest.Mock).mockRejectedValue(error);

      await registerRequest('testUser', 'test@mail.com', 'testPass');

      expect(handleApiNotify).toHaveBeenCalledWith(error);
    });
  });
});
