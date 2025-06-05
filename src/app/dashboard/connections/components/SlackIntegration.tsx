// src/app/dashboard/connections/components/SlackIntegration.tsx
'use client';
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'remixicon/fonts/remixicon.css';
import { getSlackAuthUrl, sendSlackAuthCode } from '../../../../services/integrationService';

interface SlackIntegrationProps {
    isSignedIn: boolean;
    userId: string | null;
    authAttemptFailed?: boolean;
    // Add a callback to inform parent about successful integration
    onIntegrationSuccess?: () => void;
    onIntegrationFailure?: () => void;
}

export default function SlackIntegration({ isSignedIn, userId, authAttemptFailed, onIntegrationSuccess, onIntegrationFailure }: SlackIntegrationProps) {
    const signInToSlack = async () => {
        if (!userId) {
            console.error("SlackIntegration: User information is missing. Cannot initiate Slack sign-in.");
            alert("User session error. Please try logging in again or refresh the page.");
            return;
        }
        try {
            const url = getSlackAuthUrl(userId);
            window.location.href = url;
        } catch (error) {
            console.error("Slack auth failed:", error);
            alert("Failed to connect to Slack. Please try again.");
            if (onIntegrationFailure) onIntegrationFailure();
        }
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