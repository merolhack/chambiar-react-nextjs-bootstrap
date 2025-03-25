// services/auth.js
import apiClient from './api';

export const login = async (username, password) => {
  console.log("username", username);
  console.log("password", password);
  try {
    const response = await apiClient.post('/auth/login', {
      username,
      password
    }, {
      withCredentials: true // For HttpOnly cookies
    });
    // If your backend doesn't set HttpOnly cookies, set them client-side
    if (response.data.access_token) {
      document.cookie = `access_token=${response.data.access_token}; path=/; Secure; SameSite=Strict`;
    }
    return response.data;
  } catch (error) {
    // Generic error message to prevent info leakage
    throw new Error("Login failed. Please check your credentials.");
  }
};

export const checkStatus = async () => {
  try {
    const response = await apiClient.post('/auth/check-status');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const updateStatus = async (integration, enabled) => {
  try {
    const response = await apiClient.post('/auth/update-status', { integration, enabled });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
