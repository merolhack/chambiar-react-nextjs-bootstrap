// src/services/integrationService.ts
import apiClient from './api';

const apiHost = process.env.NEXT_PUBLIC_API_HOST || 'https://chambiar-prod-backend-app-563127813488.us-central1.run.app';

export const checkStatus = async () => {
  try {
    const response = await apiClient.post('/integrations/check-status');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

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

export const getGoogleDocsAuthUrl = (userId: string) => {
  // This function returns the Google Docs authorization URL
  return `${apiHost}/auth/google-docs?userId=${userId}`;
}

export const getGoogleCalendarAuthUrl = (userId: string) => {
  // This function returns the Google Calendar authorization URL
  return `${apiHost}/auth/google-calendar?userId=${userId}`;
}

export const getGoogleGmailAuthUrl = (userId: string) => {
  // This function returns the Google Docs authorization URL
  return `${apiHost}/auth/google-gmail?userId=${userId}`;
}

export const getSlackAuthUrl = (userId: string) => {
  // This function returns the Slack authorization URL
  return `${apiHost}/slack/auth-url?userId=${userId}`;
}

export const getOffice365ExcelAuthUrl = (userId: string) => {
  // This function returns the Office 365 Excel authorization URL
  return `${apiHost}/office365-excel/initiate-microsoft-oauth?userId=${userId}`;
}

export const getHubspotAuthUrl = (userId: string) => {
  // This function returns the HubSpot authorization URL
  return `${apiHost}/auth/hubspot?userId=${userId}`;
}

export const getNotionAuthUrl = (userId: string) => {
  // This function returns the Notion authorization URL
  return `${apiHost}/auth/notion?userId=${userId}`;
}

export const getZoomAuthUrl = (userId: string) => {
  // This function returns the Zoom authorization URL
  return `${apiHost}/auth/zoom?userId=${userId}`;
}