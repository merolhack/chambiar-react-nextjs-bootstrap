// src/services/integrationService.ts
import apiClient from './api';

export const updateIntegrationStatus = async (integration: string, enabled: boolean) => {
  try {
    const response = await apiClient.post('/auth/update-status', { integration, enabled });
    return response.data;
  } catch (error) {
    throw error;
  }
};
