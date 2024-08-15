// Frontend - /frontend/src/services/SheetService.js

import AuthService from './AuthService';

const SheetService = {
  getSheets: async () => {
    const res = await fetch('http://localhost:5000/sheets', {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': AuthService.getToken(), // Include the JWT token in the request headers
      },
    });
    const data = await res.json();
    if (res.ok) {
      return data; // Return the data if the request was successful
    } else {
      throw new Error(data.msg); // Throw an error if the request fails
    }
  },
};

export default SheetService;
