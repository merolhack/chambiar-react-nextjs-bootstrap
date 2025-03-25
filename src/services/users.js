// services/users.js
import apiClient from './api';

export const getProfile = async () => {
  try {
    const response = await apiClient.get('/users/profile');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
