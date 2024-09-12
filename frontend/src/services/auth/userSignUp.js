// frontend - src/services/auth/userSignUp.js
import axios from 'axios';
import errorHandler from '../../helpers/errorHandler';

async function userSignUp({ username, email, password }) {
  try {
    const { data } = await axios.post('api/users', {
      user: { username, email, password },
    });

    const { user } = data;
    const headers = { Authorization: `Token ${user.token}` };

    const loggedIn = { headers, isAuth: true, loggedUser: user };

    localStorage.setItem('loggedUser', JSON.stringify(loggedIn));

    return loggedIn;
  } catch (error) {
    throw errorHandler(error);
  }
}

export default userSignUp;
