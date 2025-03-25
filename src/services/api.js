// services/api.js
import axios from 'axios';

const backendHost = process.env.NEXT_PUBLIC_API_HOST || 'https://chambiar-prod-backend-app-563127813488.us-central1.run.app';

const apiClient = axios.create({
  baseURL: backendHost,
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
