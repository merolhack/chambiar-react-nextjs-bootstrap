// src/app/dashboard/connections/components/SlackIntegration.tsx
'use client';
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'remixicon/fonts/remixicon.css';

const SERVER_URL = process.env.NEXT_PUBLIC_API_HOST;

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
        if (!SERVER_URL) {
            console.error("SlackIntegration: Client configuration error: NEXT_PUBLIC_API_HOST is not defined.");
            alert("Configuration error. Cannot connect to Slack.");
            return;
        }
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
            // Remove the code from URL to prevent re-processing on refresh/navigation
            const newUrl = window.location.pathname + urlParams.toString().replace(/&?code=[^&]+/, '').replace(/^\?$/, '');
            window.history.replaceState({}, document.title, newUrl);

            console.log("Slack code found:", slackCode);
            sendCodeToBackend(slackCode);
        }
    }, [userId]); // Rerun if userId changes (e.g., after login)

    const sendCodeToBackend = async (code: string) => {
        if (!SERVER_URL) {
            console.error("SlackIntegration: NEXT_PUBLIC_API_HOST is not defined. Cannot send code to backend.");
            if (onIntegrationFailure) onIntegrationFailure();
            return;
        }

        try {
            const response = await fetch(`${SERVER_URL}/slack/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // IMPORTANT: Use a dynamically obtained token here
                    'Authorization': `Bearer ${TEMP_AUTH_TOKEN}`,
                    // The Cookie header is typically managed by the browser automatically if your API sets cookies.
                    // If you need to send it explicitly and it's an HttpOnly cookie, you cannot do it from client-side JS.
                    // The cURL example includes a Cookie header, but this is usually handled by the browser itself for same-origin requests or if credentials are included.
                },
                body: JSON.stringify({ code: code }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Slack token exchange successful:', data);
                alert('Successfully connected to Slack!');
                if (onIntegrationSuccess) onIntegrationSuccess(); // Notify parent component
            } else {
                const errorData = await response.json();
                console.error('Slack token exchange failed:', response.status, errorData);
                alert(`Failed to connect to Slack: ${errorData.message || response.statusText}`);
                if (onIntegrationFailure) onIntegrationFailure(); // Notify parent component
            }
        } catch (error) {
            console.error('Error sending Slack code to backend:', error);
            alert('An error occurred while connecting to Slack.');
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