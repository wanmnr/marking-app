// src/services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // Change to your API URL
  withCredentials: true, // Important to send HttpOnly cookies with requests
});

export default apiClient;
