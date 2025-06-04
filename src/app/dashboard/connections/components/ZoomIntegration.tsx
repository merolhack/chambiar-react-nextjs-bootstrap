// src/app/dashboard/connections/components/ZoomIntegration.tsx
'use client';
import React from 'react';
import { Button } from 'react-bootstrap';
import 'remixicon/fonts/remixicon.css';
import { getZoomAuthUrl } from '@/services/integrationService';

interface ZoomIntegrationProps {
    isSignedIn: boolean;
    userId: string | null;
    authAttemptFailed?: boolean;
}

export default function ZoomIntegration({ isSignedIn, userId, authAttemptFailed }: ZoomIntegrationProps) {
    const signInToZoom = () => {
        if (!userId) {
            console.error("ZoomIntegration: User information is missing. Cannot initiate Zoom sign-in.");
            alert("User session error. Please try logging in again or refresh the page.");
            return;
        }
        // IMPORTANT: Replace '/auth/zoom' with your actual backend endpoint for Zoom OAuth
        window.location.href = getZoomAuthUrl(userId);
    };

    if (isSignedIn && !authAttemptFailed) {
        return (
            <div className="text-center py-4">
                <div className="d-flex justify-content-center mb-2">
                    <i className="ri-checkbox-circle-fill text-success" style={{ fontSize: '1.5rem' }}></i>
                </div>
                <p className="text-success small mb-1">
                    Authenticated with Zoom
                </p>
            </div>
        );
    } else {
        return (
            <div className="d-flex flex-column align-items-center mt-2">
                <p className="text-muted mb-3 text-center small">
                    {authAttemptFailed
                        ? "To finish enabling Zoom, please connect your Zoom account."
                        : "Connect your Zoom account."}
                </p>
                <Button
                    onClick={signInToZoom}
                    variant="outline-primary"
                    size="sm"
                    className="w-auto"
                >
                     {/* Using a generic video icon as a placeholder for Zoom */}
                    <i className="ri-vidicon-line me-2"></i>
                    Sign in with Zoom
                </Button>
            </div>
        );
    }
}