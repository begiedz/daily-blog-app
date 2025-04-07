import axios from 'axios';

export const getAllUsers = async () => {
  const token = localStorage.getItem('token');

  return await axios
    .get('http://localhost:5017/api/Users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      console.log('/api/Users response:', response.data);
      return response.data;
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
};

export const deleteUser = async (id: number) => {
  const token = localStorage.getItem('token');

  return await axios
    .delete(`http://localhost:5017/api/Users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      console.log('DELETE /api/Users/{id} response:', response.data);
      return response.data;
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
};

export const updateUserRole = async (id: number, role: string) => {
  const token = localStorage.getItem('token');

  return await axios
    .put(`http://localhost:5017/api/Users/${id}/role`, role, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log('PUT /api/Users/{id}/role response:', response.data);
      return response.data;
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
};

export const getUserProfile = async () => {
  const token = localStorage.getItem('token');

  return await axios
    .get('http://localhost:5017/api/Users/get-my-profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      console.log('/api/Users/get-my-profile response:', response.data);
      return response.data;
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
};

export const updateUserProfile = async (email: string, password: string) => {
  const token = localStorage.getItem('token');

  return await axios
    .put(
      'http://localhost:5017/api/Users/update-my-account',
      { email, password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then(response => {
      console.log('/api/Users/update-my-account response:', response.data);
      return response.data;
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
};
