// services/prompts.js
import apiClient from './api';

export const getInitialPrompt = async () => {
  try {
    const response = await apiClient.get('/prompts/prompt/initial');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
