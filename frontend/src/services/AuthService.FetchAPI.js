const AuthService = {
  login: async (username, password) => {
    const res = await fetch('http://localhost:5000/auth/login', { // Ensure the correct URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }), // Send username and password as JSON
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token); // Store the token in local storage
      return true; // Indicate success
    } else {
      throw new Error(data.msg || 'Unknown error'); // Throw an error if login fails
      return false; // Indicate failure
    }
  },

  register: async (username, password) => {
    const res = await fetch('http://localhost:5000/auth/register', { // Ensure the correct URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }), // Send username and password as JSON
    });
    const data = await res.json();
    if (res.ok) {
      // Registration successful
      return true; // Indicate success
    } else {
      throw new Error(data.msg || 'Unknown error'); // Throw an error if registration fails
      return false; // Indicate success
    }
  },

  logout: () => {
    localStorage.removeItem('token'); // Remove the token from local storage
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token'); // Check if the token exists
  },

  getToken: () => {
    return localStorage.getItem('token'); // Get the token from local storage
  },
};