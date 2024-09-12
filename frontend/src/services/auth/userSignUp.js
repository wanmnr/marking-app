import apiClient from '../apiClient';
import errorHandler from '../../helpers/errorHandler';

async function userSignUp(userData) {
  try {
    // Sending the signup request with the provided user data (username, email, password)
    const response = await apiClient.post('/auth/signup', userData);

    // Extracting the user information and token from the response
    const loggedUser = response.data;

    // Returning the full loggedUser object to be handled by AuthContext
    return { loggedUser };
  } catch (error) {
    // Using the errorHandler to throw a custom error
    throw errorHandler(error);
  }
}

export default userSignUp;
