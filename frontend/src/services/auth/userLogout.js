// frontend - src/services/auth/userLogout.js
import apiClient from '../apiClient';

const userLogout = async () => {
  try {
    await apiClient.post('/auth/logout');
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Logout failed');
  }
};

export default userLogout;