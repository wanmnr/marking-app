// frontend - src/services/auth/userLogin.js
import apiClient from '../apiClient';

async function userLogin(username, password) {
  try {
    const response = await apiClient.post('/auth/login', {
      username,
      password,
    });
    const user = response.data;
    return { user, isAuth: true };
  } catch (error) {
    throw new Error(
      error.response?.data?.msg || 'Login failed. Please try again.'
    );
  }
}
export default userLogin;
