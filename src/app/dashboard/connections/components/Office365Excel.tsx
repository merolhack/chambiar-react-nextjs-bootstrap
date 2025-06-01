// src/app/dashboard/connections/components/Office365Excel.tsx
'use client';
import React from 'react';
import { Button } from 'react-bootstrap';
import 'remixicon/fonts/remixicon.css';

const SERVER_URL = process.env.NEXT_PUBLIC_API_HOST;

interface Office365ExcelProps {
    isSignedIn: boolean;
    userId: string | null;
    authAttemptFailed?: boolean;
}

export default function Office365Excel({ isSignedIn, userId, authAttemptFailed }: Office365ExcelProps) {
    const signInToMicrosoft = () => {
        if (!SERVER_URL) {
            console.error("Office365Excel: Client configuration error: NEXT_PUBLIC_API_HOST is not defined.");
            alert("Configuration error. Cannot connect to Microsoft.");
            return;
        }
        if (!userId) {
            console.error("Office365Excel: User information is missing. Cannot initiate Microsoft sign-in.");
            alert("User session error. Please try logging in again or refresh the page.");
            return;
        }
        // IMPORTANT: Replace '/auth/microsoft' with your actual backend endpoint for Microsoft OAuth
        window.location.href = `${SERVER_URL}/auth/microsoft?userId=${userId}`;
    };

    if (isSignedIn && !authAttemptFailed) {
        return (
            <div className="text-center py-4">
                <div className="d-flex justify-content-center mb-2">
                    <i className="ri-checkbox-circle-fill text-success" style={{ fontSize: '1.5rem' }}></i>
                </div>
                <p className="text-success small mb-1">
                    Authenticated for Office 365 Excel
                </p>
            </div>
        );
    } else {
        return (
            <div className="d-flex flex-column align-items-center mt-2">
                <p className="text-muted mb-3 text-center small">
                    {authAttemptFailed
                        ? "To finish enabling Office 365 Excel, please connect your Microsoft account."
                        : "Connect your Microsoft account to access your Excel files."}
                </p>
                <Button
                    onClick={signInToMicrosoft}
                    variant="outline-primary" // You might want a different variant or color for Microsoft
                    size="sm"
                    className="w-auto"
                >
                    <i className="ri-microsoft-line me-2"></i> {/* Using a Microsoft icon */}
                    Sign in with Microsoft
                </Button>
            </div>
        );
    }
}