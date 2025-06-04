// src/app/dashboard/connections/components/HubSpotCrm.tsx
'use client';
import React from 'react';
import { Button } from 'react-bootstrap';
import 'remixicon/fonts/remixicon.css';
import { getHubspotAuthUrl } from '@/services/integrationService';

interface HubSpotCrmProps {
    isSignedIn: boolean;
    userId: string | null;
    authAttemptFailed?: boolean;
}

export default function HubSpotCrm({ isSignedIn, userId, authAttemptFailed }: HubSpotCrmProps) {
    const signInToHubSpot = () => {
        if (!userId) {
            console.error("HubSpotCrm: User information is missing. Cannot initiate HubSpot sign-in.");
            alert("User session error. Please try logging in again or refresh the page.");
            return;
        }
        // IMPORTANT: Replace '/auth/hubspot' with your actual backend endpoint for HubSpot OAuth
        window.location.href = getHubspotAuthUrl(userId);
    };

    if (isSignedIn && !authAttemptFailed) {
        return (
            <div className="text-center py-4">
                <div className="d-flex justify-content-center mb-2">
                    <i className="ri-checkbox-circle-fill text-success" style={{ fontSize: '1.5rem' }}></i>
                </div>
                <p className="text-success small mb-1">
                    Authenticated with HubSpot CRM
                </p>
            </div>
        );
    } else {
        return (
            <div className="d-flex flex-column align-items-center mt-2">
                <p className="text-muted mb-3 text-center small">
                    {authAttemptFailed
                        ? "To finish enabling HubSpot CRM, please connect your HubSpot account."
                        : "Connect your HubSpot account."}
                </p>
                <Button
                    onClick={signInToHubSpot}
                    variant="outline-primary"
                    size="sm"
                    className="w-auto"
                >
                    {/* Using building icon as a placeholder for HubSpot */}
                    <i className="ri-building-line me-2"></i>
                    Sign in with HubSpot
                </Button>
            </div>
        );
    }
}