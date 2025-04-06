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
