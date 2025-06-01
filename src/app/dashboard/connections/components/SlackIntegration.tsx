// src/app/dashboard/connections/components/SlackIntegration.tsx
'use client';
import React from 'react';
import { Button } from 'react-bootstrap';
import 'remixicon/fonts/remixicon.css';

const SERVER_URL = process.env.NEXT_PUBLIC_API_HOST;

interface SlackIntegrationProps {
    isSignedIn: boolean;
    userId: string | null;
    authAttemptFailed?: boolean;
}

export default function SlackIntegration({ isSignedIn, userId, authAttemptFailed }: SlackIntegrationProps) {
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
        // IMPORTANT: Replace '/auth/slack' with your actual backend endpoint for Slack OAuth
        window.location.href = `${SERVER_URL}/auth/slack?userId=${userId}`;
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