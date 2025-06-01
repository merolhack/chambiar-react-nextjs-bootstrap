// src/app/dashboard/connections/components/NotionIntegration.tsx
'use client';
import React from 'react';
import { Button } from 'react-bootstrap';
import 'remixicon/fonts/remixicon.css';

const SERVER_URL = process.env.NEXT_PUBLIC_API_HOST;

interface NotionIntegrationProps {
    isSignedIn: boolean;
    userId: string | null;
    authAttemptFailed?: boolean;
}

export default function NotionIntegration({ isSignedIn, userId, authAttemptFailed }: NotionIntegrationProps) {
    const signInToNotion = () => {
        if (!SERVER_URL) {
            console.error("NotionIntegration: Client configuration error: NEXT_PUBLIC_API_HOST is not defined.");
            alert("Configuration error. Cannot connect to Notion.");
            return;
        }
        if (!userId) {
            console.error("NotionIntegration: User information is missing. Cannot initiate Notion sign-in.");
            alert("User session error. Please try logging in again or refresh the page.");
            return;
        }
        // IMPORTANT: Replace '/auth/notion' with your actual backend endpoint for Notion OAuth
        window.location.href = `${SERVER_URL}/auth/notion?userId=${userId}`;
    };

    if (isSignedIn && !authAttemptFailed) {
        return (
            <div className="text-center py-4">
                <div className="d-flex justify-content-center mb-2">
                    <i className="ri-checkbox-circle-fill text-success" style={{ fontSize: '1.5rem' }}></i>
                </div>
                <p className="text-success small mb-1">
                    Authenticated with Notion
                </p>
            </div>
        );
    } else {
        return (
            <div className="d-flex flex-column align-items-center mt-2">
                <p className="text-muted mb-3 text-center small">
                    {authAttemptFailed
                        ? "To finish enabling Notion, please connect your Notion account."
                        : "Connect your Notion account."}
                </p>
                <Button
                    onClick={signInToNotion}
                    variant="outline-primary"
                    size="sm"
                    className="w-auto"
                >
                    <i className="ri-notion-fill me-2"></i>
                    Sign in with Notion
                </Button>
            </div>
        );
    }
}