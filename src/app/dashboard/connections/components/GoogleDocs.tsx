// src/app/dashboard/connections/components/GoogleDocs.tsx
'use client';
import React from 'react';
import { Button } from 'react-bootstrap';
import 'remixicon/fonts/remixicon.css';

// SERVER_URL is used here for the redirect.
const SERVER_URL = process.env.NEXT_PUBLIC_API_HOST;

interface GoogleDocsProps {
    isSignedIn: boolean;
    userId: string | null;
    authAttemptFailed?: boolean;
}

export default function GoogleDocs({ isSignedIn, userId, authAttemptFailed }: GoogleDocsProps) {
    const signInToGoogle = () => {
        if (!SERVER_URL) {
            console.error("GoogleDocs: Client configuration error: NEXT_PUBLIC_API_HOST is not defined.");
            alert("Configuration error. Cannot connect to Google.");
            return;
        }
        if (!userId) {
            console.error("GoogleDocs: User information is missing. Cannot initiate Google sign-in.");
            alert("User session error. Please try logging in again or refresh the page.");
            return;
        }
        // Parent will clear explicitAuthNeeded upon successful re-fetch (after OAuth redirect and page reload)
        // and seeing isAuthenticated = true.
        window.location.href = `${SERVER_URL}/auth/google?userId=${userId}`;
    };

    if (isSignedIn && !authAttemptFailed) {
        return (
            <div className="text-center py-4">
                <div className="d-flex justify-content-center mb-2">
                    <i className="ri-checkbox-circle-fill text-success" style={{ fontSize: '1.5rem' }}></i>
                </div>
                <p className="text-success small mb-1">
                    Authenticated for Google Documents
                </p>
            </div>
        );
    } else {
        return (
            <div className="d-flex flex-column align-items-center mt-2">
                <p className="text-muted mb-3 text-center small">
                    {authAttemptFailed
                        ? "To finish enabling Google Documents, please connect your Google account."
                        : "Connect your Google account to access your documents."}
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