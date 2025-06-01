// src/app/dashboard/connections/ConnectedIntegrations.tsx
'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react'; // Added useRef
import { useRouter } from 'next/navigation';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import 'remixicon/fonts/remixicon.css';
import { updateIntegrationStatus } from '@/services/integrationService';
import { checkStatus } from "../../../services/auth";

import GoogleDocs from './components/GoogleDocs';
import GoogleCalendar from './components/GoogleCalendar';
import Gmail from './components/Gmail';
import Office365Excel from './components/Office365Excel';
import SlackIntegration from './components/SlackIntegration';
import HubSpotCrm from './components/HubSpotCrm';
import NotionIntegration from './components/NotionIntegration';
import ZoomIntegration from './components/ZoomIntegration';

const icons = {
    file: <i className="ri-file-text-line" style={{ fontSize: '1.25rem' }} />,
    calendar: <i className="ri-calendar-line" style={{ fontSize: '1.25rem' }} />,
    grid: <i className="ri-layout-grid-line" style={{ fontSize: '1.25rem' }} />,
    slack: <i className="ri-slack-line" style={{ fontSize: '1.25rem' }} />,
    building: <i className="ri-building-line" style={{ fontSize: '1.25rem' }} />,
    mail: <i className="ri-mail-line" style={{ fontSize: '1.25rem' }} />,
    excel: <i className="ri-file-excel-line" style={{ fontSize: '1.25rem' }} />,
    notion: <i className="ri-notion-line" style={{ fontSize: '1.25rem' }} />,
    video: <i className="ri-video-line" style={{ fontSize: '1.25rem' }} />,
};

const integrationsList = [
    { name: 'Google Documents', key: 'google_documents', icon: icons.file, isGoogleAuthDependent: true, isAuthDependent: true },
    { name: 'Google Calendar', key: 'google_calendar', icon: icons.calendar, isGoogleAuthDependent: true, isAuthDependent: true },
    { name: 'Gmail', key: 'gmail', icon: icons.mail, isGoogleAuthDependent: true, isAuthDependent: true },
    { name: 'Office 365: Excel', key: 'office_365_excel', icon: icons.excel, isAuthDependent: true },
    { name: 'Slack', key: 'slack', icon: icons.slack, isAuthDependent: true },
    { name: 'HubSpot CRM', key: 'hubspot_crm', icon: icons.building, isAuthDependent: true },
    { name: 'Notion', key: 'notion', icon: icons.notion, isAuthDependent: true },
    { name: 'Zoom', key: 'zoom', icon: icons.video, isAuthDependent: true },
];

type AuthStatusKeys =
    'google_documents' |
    'google_calendar' |
    'gmail' |
    'slack' |
    'office_365_excel' |
    'hubspot_crm' |
    'notion' |
    'zoom';
type AuthStatusState = Record<AuthStatusKeys, boolean>;

export default function ConnectedIntegrations() {
    const [userId, setUserId] = useState<string | null>(null);
    const [enabled, setEnabled] = useState<Record<string, boolean>>({});
    const [authStatus, setAuthStatus] = useState<AuthStatusState>({
        google_documents: false,
        google_calendar: false,
        gmail: false,
        slack: false,
        office_365_excel: false,
        hubspot_crm: false,
        notion: false,
        zoom: false,
    });
    const [loading, setLoading] = useState(true);
    const [explicitAuthNeeded, setExplicitAuthNeeded] = useState<Record<string, boolean>>({});
    const router = useRouter();

    // Refs to hold current state values for use in useCallback without adding them as dependencies
    const authStatusRef = useRef(authStatus);
    const explicitAuthNeededRef = useRef(explicitAuthNeeded);

    useEffect(() => {
        authStatusRef.current = authStatus;
    }, [authStatus]);

    useEffect(() => {
        explicitAuthNeededRef.current = explicitAuthNeeded;
    }, [explicitAuthNeeded]);

    const fetchAndSetAuthStatus = useCallback(async () => {
        // setLoading(true) will be handled by the calling useEffect or function
        try {
            const status = await checkStatus();
            console.log('Auth status response from backend:', status);

            const newAuthStatusUpdate: Partial<AuthStatusState> = {};
            const newEnabledStateUpdate: Partial<Record<string, boolean>> = {};
            const updatedExplicitAuthNeededKeys: Record<string, boolean> = {};
            let needsExplicitAuthUpdate = false;

            if (status && status.userId) {
                setUserId(status.userId);
            }

            if (status && status.integrations) {
                integrationsList.forEach(({ key, isGoogleAuthDependent }) => {
                    const integrationData = status.integrations[key];
                    newEnabledStateUpdate[key] = integrationData?.enabled || false;

                    if (Object.prototype.hasOwnProperty.call(authStatusRef.current, key)) {
                        const isAuthenticated = integrationData?.isAuthenticated || false;
                        newAuthStatusUpdate[key as AuthStatusKeys] = isAuthenticated;

                        if (isGoogleAuthDependent && isAuthenticated && explicitAuthNeededRef.current[key]) {
                            updatedExplicitAuthNeededKeys[key] = false; // Mark for setting to false
                            needsExplicitAuthUpdate = true;
                        }
                    }
                });

                setAuthStatus(prev => ({ ...prev, ...newAuthStatusUpdate }));
                setEnabled(prev => ({ ...prev, ...newEnabledStateUpdate }));

                if (needsExplicitAuthUpdate) {
                    setExplicitAuthNeeded(prev => {
                        const nextState = { ...prev };
                        for (const keyToUpdate in updatedExplicitAuthNeededKeys) {
                            if (Object.prototype.hasOwnProperty.call(updatedExplicitAuthNeededKeys, keyToUpdate)) {
                                nextState[keyToUpdate] = updatedExplicitAuthNeededKeys[keyToUpdate];
                            }
                        }
                        return nextState;
                    });
                }
            } else {
                console.warn('ConnectedIntegrations: Received unexpected status object or missing integrations:', status);
                // Updated defaultAuthState to include all keys
                const defaultAuthState: AuthStatusState = {
                    google_documents: false, google_calendar: false, gmail: false, slack: false,
                    office_365_excel: false, hubspot_crm: false, notion: false, zoom: false
                };
                setAuthStatus(defaultAuthState);
                const defaultEnabledState = integrationsList.reduce((acc, { key }) => {
                    acc[key] = false; return acc;
                }, {} as Record<string, boolean>);
                setEnabled(defaultEnabledState);
                setExplicitAuthNeeded({});
            }
        } catch (error: any) {
            console.error('ConnectedIntegrations: Failed to check auth status:', error.response?.data || error.message);
            if (error.response && error.response.status === 401) {
                console.warn("ConnectedIntegrations: App session may have expired during status check. Login required.");
                // As per user request, redirect is removed. Consider alternative UI feedback.
                // router.push('/auth/login');
            } else {
                console.error("ConnectedIntegrations: Could not load integration statuses due to an unexpected error.");
            }
        }
        // setLoading(false) will be handled by the calling useEffect or function
    }, [router]); // setUserId is stable from useState

    useEffect(() => {
        const initState = integrationsList.reduce((acc, { key }) => {
            acc[key] = false;
            return acc;
        }, {} as Record<string, boolean>);
        setEnabled(initState);
        setExplicitAuthNeeded({}); // Initialize explicitAuthNeeded
        setLoading(true);
        fetchAndSetAuthStatus().finally(() => {
            setLoading(false);
        });
    }, [fetchAndSetAuthStatus]);


    const handleToggleIntegration = async (integrationKey: string) => {
        const integrationMeta = integrationsList.find(i => i.key === integrationKey);
        if (!integrationMeta) return;

        const intendedToBeEnabled = !enabled[integrationKey];
        const originalEnabledStateForKey = enabled[integrationKey];
        const originalAuthStatusForKey = authStatus[integrationKey as AuthStatusKeys]; // Use current authStatus

        setEnabled(prev => ({ ...prev, [integrationKey]: intendedToBeEnabled }));
        // Optimistically clear any explicit auth need prompts for this integration
        setExplicitAuthNeeded(prev => ({ ...prev, [integrationKey]: false }));


        try {
            const backendResponse = await updateIntegrationStatus(integrationKey, intendedToBeEnabled);

            if (backendResponse && backendResponse[integrationKey]) {
                setEnabled(prev => ({ ...prev, [integrationKey]: backendResponse[integrationKey].enabled }));
                if (Object.prototype.hasOwnProperty.call(authStatus, integrationKey)) { // Check against current authStatus state
                    const isAuthenticated = backendResponse[integrationKey].isAuthenticated;
                    setAuthStatus(prev => ({ ...prev, [integrationKey as AuthStatusKeys]: isAuthenticated }));
                    // If successfully authenticated, ensure explicit auth needed flag is false
                    if (integrationMeta.isGoogleAuthDependent && isAuthenticated) {
                        setExplicitAuthNeeded(prev => ({ ...prev, [integrationKey]: false }));
                    }
                }
            } else {
                console.warn('ConnectedIntegrations: Unexpected response from updateIntegrationStatus, reverting UI and refreshing all statuses.');
                setEnabled(prev => ({ ...prev, [integrationKey]: originalEnabledStateForKey }));
                if (Object.prototype.hasOwnProperty.call(authStatus, integrationKey)) {
                    setAuthStatus(prev => ({ ...prev, [integrationKey as AuthStatusKeys]: originalAuthStatusForKey }));
                }
                setLoading(true); // Show loading while refreshing all statuses
                fetchAndSetAuthStatus().finally(() => setLoading(false));
            }
        } catch (error: any) {
            console.error(`ConnectedIntegrations: Update failed for integration ${integrationKey}:`, error.response?.data || error.message);
            // Revert optimistic UI changes
            setEnabled(prev => ({ ...prev, [integrationKey]: originalEnabledStateForKey }));
            if (Object.prototype.hasOwnProperty.call(authStatus, integrationKey)) {
                setAuthStatus(prev => ({ ...prev, [integrationKey as AuthStatusKeys]: originalAuthStatusForKey }));
            }

            if (error.response && error.response.status === 401) {
                const errorMessage = error.response.data?.message?.toLowerCase() || "";
                const googleAuthNeededKeywords = [
                    "google authentication required", "base google authentication is required",
                    "google token expired, please re-authenticate", "google authentication is invalid"
                ];

                if (integrationMeta.isGoogleAuthDependent && googleAuthNeededKeywords.some(keyword => errorMessage.includes(keyword))) {
                    if (!userId) { // userId from state
                        console.error("ConnectedIntegrations: User ID is missing. Cannot signal Google authentication requirement. App session might be invalid.");
                        // As per user request, redirect is removed. Consider alternative UI feedback.
                        // router.push('/auth/login');
                        return;
                    }
                    // Signal that this specific integration needs explicit Google Auth
                    setExplicitAuthNeeded(prev => ({ ...prev, [integrationKey]: true }));
                    console.log(`ConnectedIntegrations: Signaled ${integrationKey} that explicit Google Auth is needed.`);
                } else {
                    console.warn(`ConnectedIntegrations: Application authentication error for ${integrationKey}: ${errorMessage}. Login required.`);
                    // As per user request, redirect is removed. Consider alternative UI feedback.
                    // router.push('/auth/login');
                }
            } else {
                console.error(`ConnectedIntegrations: Server or network error for ${integrationKey}: ${error.response?.data?.message || error.message}`);
                // UI reverted, error logged. Consider showing a generic error message to the user.
            }
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
            </div>
        );
    }
    // Helper to render the auth status text
    const renderAuthStatusText = (integrationKey: AuthStatusKeys) => {
        if (authStatus[integrationKey] && !explicitAuthNeeded[integrationKey]) {
            return <span className="text-success"><i className="ri-checkbox-circle-fill me-1"></i> Authenticated</span>;
        }
        return <span className="text-warning"><i className="ri-error-warning-fill me-1"></i> Needs authentication</span>;
    };

    return (
        <Row className="mt-5 g-3">
            <Col md={3}>
                <Card className="shadow-sm h-100">
                    <Card.Body>
                        <Card.Title className="mb-4">Connected Integrations</Card.Title>
                        {integrationsList.map(({ name, icon, key }) => (
                            <React.Fragment key={key}>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="d-flex align-items-center">
                                        <span className="me-2" style={{ width: '24px', display: 'inline-block' }}>{icon}</span>
                                        <span>{name}</span>
                                    </div>
                                    <Form.Check
                                        type="switch"
                                        id={`switch-${key}`}
                                        checked={enabled[key] || false}
                                        onChange={() => handleToggleIntegration(key)}
                                        // Enable toggle if auth status for this key is tracked
                                        disabled={!Object.prototype.hasOwnProperty.call(authStatus, key)}
                                    />
                                </div>
                            </React.Fragment>
                        ))}
                        <Button variant="primary" className="w-100 mt-4" onClick={() => router.push('/ai')}>
                            Start
                        </Button>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={9}>
                {/* Google Docs Section */}
                {(enabled.google_documents || explicitAuthNeeded.google_documents) && (
                    <Card className="shadow-sm h-100 mb-3">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h5>Google Documents</h5>
                                <p className="text-muted mb-0">
                                    {authStatus.google_documents && !explicitAuthNeeded.google_documents ? (
                                        <span className="text-success"><i className="ri-checkbox-circle-fill me-1"></i> Authenticated</span>
                                    ) : (
                                        <span className="text-warning"><i className="ri-error-warning-fill me-1"></i> Needs authentication</span>
                                    )}
                                </p>
                            </div>
                            <GoogleDocs
                                isSignedIn={authStatus.google_documents}
                                userId={userId}
                                authAttemptFailed={explicitAuthNeeded.google_documents || false}
                            />
                        </Card.Body>
                    </Card>
                )}

                {/* Google Docs Section */}
                {(enabled.google_documents || explicitAuthNeeded.google_documents) && (
                    <Card className="shadow-sm mb-3"> {/* Removed h-100 to allow natural height */}
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h5>Google Documents</h5>
                                <p className="text-muted mb-0">{renderAuthStatusText('google_documents')}</p>
                            </div>
                            <GoogleDocs
                                isSignedIn={authStatus.google_documents}
                                userId={userId}
                                authAttemptFailed={explicitAuthNeeded.google_documents || false}
                            />
                        </Card.Body>
                    </Card>
                )}

                {/* Google Calendar Section */}
                {(enabled.google_calendar || explicitAuthNeeded.google_calendar) && (
                    <Card className="shadow-sm mb-3">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h5>Google Calendar</h5>
                                <p className="text-muted mb-0">{renderAuthStatusText('google_calendar')}</p>
                            </div>
                            <GoogleCalendar
                                isSignedIn={authStatus.google_calendar}
                                userId={userId}
                                authAttemptFailed={explicitAuthNeeded.google_calendar || false}
                            />
                        </Card.Body>
                    </Card>
                )}

                {/* Gmail Section */}
                {(enabled.gmail || explicitAuthNeeded.gmail) && (
                    <Card className="shadow-sm mb-3">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h5>Gmail</h5>
                                <p className="text-muted mb-0">{renderAuthStatusText('gmail')}</p>
                            </div>
                            <Gmail
                                isSignedIn={authStatus.gmail}
                                userId={userId}
                                authAttemptFailed={explicitAuthNeeded.gmail || false}
                            />
                        </Card.Body>
                    </Card>
                )}

                {/* Office 365: Excel Section */}
                {(enabled.office_365_excel || explicitAuthNeeded.office_365_excel) && (
                    <Card className="shadow-sm mb-3">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h5>Office 365: Excel</h5>
                                <p className="text-muted mb-0">{renderAuthStatusText('office_365_excel')}</p>
                            </div>
                            <Office365Excel
                                isSignedIn={authStatus.office_365_excel}
                                userId={userId}
                                authAttemptFailed={explicitAuthNeeded.office_365_excel || false}
                            />
                        </Card.Body>
                    </Card>
                )}

                {/* Slack Section */}
                {(enabled.slack || explicitAuthNeeded.slack) && (
                    <Card className="shadow-sm mb-3">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h5>Slack</h5>
                                <p className="text-muted mb-0">{renderAuthStatusText('slack')}</p>
                            </div>
                            <SlackIntegration
                                isSignedIn={authStatus.slack}
                                userId={userId}
                                authAttemptFailed={explicitAuthNeeded.slack || false}
                            />
                        </Card.Body>
                    </Card>
                )}

                {/* HubSpot CRM Section */}
                {(enabled.hubspot_crm || explicitAuthNeeded.hubspot_crm) && (
                    <Card className="shadow-sm mb-3">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h5>HubSpot CRM</h5>
                                <p className="text-muted mb-0">{renderAuthStatusText('hubspot_crm')}</p>
                            </div>
                            <HubSpotCrm
                                isSignedIn={authStatus.hubspot_crm}
                                userId={userId}
                                authAttemptFailed={explicitAuthNeeded.hubspot_crm || false}
                            />
                        </Card.Body>
                    </Card>
                )}

                {/* Notion Section */}
                {(enabled.notion || explicitAuthNeeded.notion) && (
                    <Card className="shadow-sm mb-3">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h5>Notion</h5>
                                <p className="text-muted mb-0">{renderAuthStatusText('notion')}</p>
                            </div>
                            <NotionIntegration
                                isSignedIn={authStatus.notion}
                                userId={userId}
                                authAttemptFailed={explicitAuthNeeded.notion || false}
                            />
                        </Card.Body>
                    </Card>
                )}

                {/* Zoom Section */}
                {(enabled.zoom || explicitAuthNeeded.zoom) && (
                    <Card className="shadow-sm mb-3">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h5>Zoom</h5>
                                <p className="text-muted mb-0">{renderAuthStatusText('zoom')}</p>
                            </div>
                            <ZoomIntegration
                                isSignedIn={authStatus.zoom}
                                userId={userId}
                                authAttemptFailed={explicitAuthNeeded.zoom || false}
                            />
                        </Card.Body>
                    </Card>
                )}
            </Col>
        </Row>
    );
}
