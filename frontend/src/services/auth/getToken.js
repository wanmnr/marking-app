// src/services/auth/getToken.js
function getToken() {
  return localStorage.getItem('token');
}

export default getToken;
