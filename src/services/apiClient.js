// Centralized Axios Instance
// Handles base URL, authentication, and global error handling

import axios from 'axios';
import { API_BASE_URL } from '../config/env';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor: Automatically attach JWT token from localStorage
apiClient.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('tokens'))?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle 401 unauthorized globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear tokens and redirect to login
      localStorage.removeItem('tokens');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;