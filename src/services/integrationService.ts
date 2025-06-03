// src/services/integrationService.ts
import apiClient from './api';

export const updateIntegrationStatus = async (integration: string, enabled: boolean) => {
  try {
    const response = await apiClient.post('/integrations/update-status', { integration, enabled });
    return response.data;
  } catch (error) {
    throw error;
  }
};
// New function to send the Slack authorization code to the backend
export const sendSlackAuthCode = async (code: string) => {
  try {
    // The apiClient already has an interceptor to add the Authorization header
    // and is configured with the baseURL.
    const response = await apiClient.post('/slack/auth', { code });
    return response.data;
  } catch (error) {
    console.error('Error sending Slack auth code:', error.response ? error.response.data : error.message);
    throw error; // Rethrow to be handled by the calling component
  }
};