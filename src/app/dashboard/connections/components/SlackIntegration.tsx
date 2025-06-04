// src/app/dashboard/connections/components/SlackIntegration.tsx
'use client';
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'remixicon/fonts/remixicon.css';
import { sendSlackAuthCode } from '../../../../services/integrationService';

interface SlackIntegrationProps {
    isSignedIn: boolean;
    userId: string | null;
    authAttemptFailed?: boolean;
    // Add a callback to inform parent about successful integration
    onIntegrationSuccess?: () => void;
    onIntegrationFailure?: () => void;
}

export default function SlackIntegration({ isSignedIn, userId, authAttemptFailed, onIntegrationSuccess, onIntegrationFailure }: SlackIntegrationProps) {
    const signInToSlack = () => {
        if (!userId) {
            console.error("SlackIntegration: User information is missing. Cannot initiate Slack sign-in.");
            alert("User session error. Please try logging in again or refresh the page.");
            return;
        }
        // Slack OAuth URL from your legacy Slack.tsx
        const clientId = "7878698019540.7894321828534";
        const scope = "incoming-webhook";
        // This comprehensive user_scope is from your Slack.tsx file
        const userScope = "bookmarks:read,bookmarks:write,channels:history,channels:read,channels:write,channels:write.invites,channels:write.topic,chat:write,groups:history,groups:read,groups:write,groups:write.invites,groups:write.topic,im:history,im:read,im:write,im:write.topic,mpim:history,mpim:read,mpim:write,users.profile:read,users.profile:write,users:read,users:write,users:read.email";

        // IMPORTANT: Define your redirect URI. This URI must be registered in your Slack App settings.
        // It should be a page in your Next.js app that can handle the callback (e.g., this current page or a dedicated one).
        // For example, if this component is at '/dashboard/connections', that could be your redirect URI.
        const redirectUri = window.location.origin + window.location.pathname; // Or your specific callback URL like `${window.location.origin}/slack/callback`

        const slackAuthUrl = `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=${scope}&user_scope=${userScope}&redirect_uri=${encodeURIComponent(redirectUri)}`;

        window.location.href = slackAuthUrl;
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const slackCode = urlParams.get('code');

        if (slackCode && userId) {
            const newUrl = window.location.pathname + urlParams.toString().replace(/&?code=[^&]+/, '').replace(/^\?$/, '');
            window.history.replaceState({}, document.title, newUrl);

            console.log("Slack code found:", slackCode);
            handleSlackCallback(slackCode); // Call the renamed handler
        }
    }, [userId]);

    // Renamed and simplified handler that calls the service
    const handleSlackCallback = async (code: string) => {
        try {
            const data = await sendSlackAuthCode(code); // Use the imported service function
            console.log('Slack token exchange successful:', data);
            alert('Successfully connected to Slack!');
            if (onIntegrationSuccess) onIntegrationSuccess();
        } catch (error) {
            // Error is already logged in the service, decide on UI feedback here
            const errorMessage = error.response?.data?.message || error.message || 'Failed to connect to Slack.';
            alert(`Failed to connect to Slack: ${errorMessage}`);
            if (onIntegrationFailure) onIntegrationFailure();
        }
    };

    if (isSignedIn && !authAttemptFailed) {
        return (
            <div className="text-center py-4">
                <div className="d-flex justify-content-center mb-2">
                    <i className="ri-checkbox-circle-fill text-success" style={{ fontSize: '1.5rem' }}></i>
                </div>
                <p className="text-success small mb-1">
                    Authenticated with Slack
                </p>
            </div>
        );
    } else {
        return (
            <div className="d-flex flex-column align-items-center mt-2">
                <p className="text-muted mb-3 text-center small">
                    {authAttemptFailed
                        ? "To finish enabling Slack, please connect your Slack account."
                        : "Connect your Slack account."}
                </p>
                <Button
                    onClick={signInToSlack}
                    variant="outline-primary" // You might want a different variant for Slack
                    size="sm"
                    className="w-auto"
                >
                    <i className="ri-slack-fill me-2"></i>
                    Sign in with Slack
                </Button>
            </div>
        );
    }
}