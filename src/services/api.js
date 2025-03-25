// services/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Send cookies with requests
});

// Request interceptor for adding the bearer token

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// services/api.js
// Remove the localStorage token handling and rely on HttpOnly cookies
/**
apiClient.interceptors.request.use((config) => {
  // If using cookies, the browser will automatically send them
  // No need to manually set Authorization header
  const csrfToken = getCSRFToken(); // Implement this function to get CSRF token
  console.log('csrfToken', csrfToken);
  if (csrfToken) {
    config.headers['X-CSRF-Token'] = csrfToken;
  }
  return config;
});
 * 
 */
export default apiClient;
