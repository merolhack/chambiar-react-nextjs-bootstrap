import apiClient from './api';

export const login = async (username, password) => {
  try {
    const response = await apiClient.post('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
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
