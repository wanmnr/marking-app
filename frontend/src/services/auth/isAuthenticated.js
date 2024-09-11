// frontend -  src/services/auth/isAuthenticated.js
function isAuthenticated() {
  return !!localStorage.getItem('token');
}

export default isAuthenticated;
