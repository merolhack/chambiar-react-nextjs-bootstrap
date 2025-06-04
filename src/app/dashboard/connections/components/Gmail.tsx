// src/app/dashboard/connections/components/Gmail.tsx
'use client';
import React from 'react';
import { Button } from 'react-bootstrap';
import 'remixicon/fonts/remixicon.css';
import { getGoogleDocsAuthUrl } from '@/services/integrationService';

interface GmailProps {
    isSignedIn: boolean;
    userId: string | null;
    authAttemptFailed?: boolean;
}

export default function Gmail({ isSignedIn, userId, authAttemptFailed }: GmailProps) {
    const signInToGoogle = () => {
        if (!userId) {
            console.error("Gmail: User information is missing. Cannot initiate Google sign-in.");
            alert("User session error. Please try logging in again or refresh the page.");
            return;
        }
        window.location.href = getGoogleDocsAuthUrl(userId);
    };

    if (isSignedIn && !authAttemptFailed) {
        return (
            <div className="text-center py-4">
                <div className="d-flex justify-content-center mb-2">
                    <i className="ri-checkbox-circle-fill text-success" style={{ fontSize: '1.5rem' }}></i>
                </div>
                <p className="text-success small mb-1">
                    Authenticated for Gmail
                </p>
            </div>
        );
    } else {
        return (
            <div className="d-flex flex-column align-items-center mt-2">
                <p className="text-muted mb-3 text-center small">
                    {authAttemptFailed
                        ? "To finish enabling Gmail, please connect your Google account."
                        : "Connect your Google account to access your Gmail."}
                </p>
                <Button
                    onClick={signInToGoogle}
                    variant="outline-primary"
                    size="sm"
                    className="w-auto"
                >
                    <i className="ri-google-fill me-2"></i>
                    Sign in with Google
                </Button>
            </div>
        );
    }
}