'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import 'remixicon/fonts/remixicon.css';
import { updateIntegrationStatus } from '@/services/integrationService';

// Updated Remixicon mappings
const icons = {
    file: <i className="ri-file-text-line" style={{ fontSize: '1.25rem' }} />,
    calendar: <i className="ri-calendar-line" style={{ fontSize: '1.25rem' }} />,
    grid: <i className="ri-layout-grid-line" style={{ fontSize: '1.25rem' }} />,
    slack: <i className="ri-slack-line" style={{ fontSize: '1.25rem' }} />,
    building: <i className="ri-building-line" style={{ fontSize: '1.25rem' }} />,
    mail: <i className="ri-mail-line" style={{ fontSize: '1.25rem' }} />,
    // NEW ICONS ADDED
    excel: <i className="ri-file-excel-line" style={{ fontSize: '1.25rem' }} />,          // For Excel
    notion: <i className="ri-notion-line" style={{ fontSize: '1.25rem' }} />,             // For Notion
    video: <i className="ri-video-line" style={{ fontSize: '1.25rem' }} />,               // For Zoom
};

const integrations = [
    {
        name: 'Google Documents',
        key: 'google_documents',
        icon: icons.file,
    },
    {
        name: 'Google Calendar',
        key: 'google_calendar',
        icon: icons.calendar,
    },
    {
        name: 'Gmail',
        key: 'gmail',
        icon: icons.mail,
    },
    {
        name: 'Office 365: Excel',
        key: 'office_365_excel',
        icon: icons.excel,
    },
    {
        name: 'Slack',
        key: 'slack',
        icon: icons.slack,
    },
    {
        name: 'HubSpot CRM',
        key: 'hubspot_crm',
        icon: icons.building,
    },
    {
        name: 'Notion',
        key: 'notion',
        icon: icons.notion,
    },
    {
        name: 'Zoom',
        key: 'zoom',
        icon: icons.video,
    },
];

export default function ConnectedIntegrations() {
    const [enabled, setEnabled] = useState<Record<string, boolean>>({});
    const [authStatus, setAuthStatus] = useState({
        google_documents: false,
        google_calendar: false,
        slack: false,
        gmail: false,
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const initState = integrations.reduce((acc, { key }) => {
            acc[key] = false;
            return acc;
        }, {} as Record<string, boolean>);

        setEnabled(initState);
    }, []);

    const toggleIntegration = async (key: string) => {
        const newEnabled = { ...enabled, [key]: !enabled[key] };
        setEnabled(newEnabled);

        try {
            await updateIntegrationStatus(key, newEnabled[key]);
        } catch (error) {
            console.error('Update failed:', error);
            setEnabled(prev => ({ ...prev, [key]: !newEnabled[key] }));
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <Row className="mt-5 g-3">
            <Col md={3}>
                <Card className="shadow-sm h-100">
                    <Card.Body>
                        <Card.Title className="mb-4">Connected Integrations</Card.Title>

                        {integrations.map(({ name, icon, key }) => (
                            <div key={key} className="d-flex justify-content-between align-items-center mb-3">
                                <div className="d-flex align-items-center">
                                    <span className="me-2" style={{ width: '24px', display: 'inline-block' }}>
                                        {icon}
                                    </span>
                                    <span>{name}</span>
                                </div>

                                <Form.Check
                                    type="switch"
                                    id={`switch-${key}`}
                                    checked={enabled[key] || false}
                                    onChange={() => toggleIntegration(key)}
                                    disabled={
                                        key !== 'google_documents' &&
                                        key !== 'google_calendar' &&
                                        key !== 'gmail' &&
                                        key !== 'slack'
                                    }
                                />
                            </div>
                        ))}

                        <Button
                            variant="primary"
                            className="w-100 mt-4"
                            onClick={() => router.push('/ai')}
                        >
                            Start
                        </Button>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={9}>
                {(enabled.slack || enabled.google_documents || enabled.google_calendar || enabled.gmail) && (
                    <Card className="shadow-sm h-100">
                        <Card.Body>
                            {enabled.google_documents && (
                                <div className="mb-4">
                                    <h5>Google Documents</h5>
                                    <p className="text-muted">
                                        {authStatus.google_documents ?
                                            <span className="text-success">
                                                <i className="ri-checkbox-circle-fill me-1"></i> Authenticated
                                            </span> :
                                            <span className="text-warning">
                                                <i className="ri-error-warning-fill me-1"></i> Needs authentication
                                            </span>
                                        }
                                    </p>
                                </div>
                            )}

                            {enabled.google_calendar && (
                                <div className="mb-4">
                                    <h5>Google Calendar</h5>
                                    <p className="text-muted">
                                        {authStatus.google_calendar ?
                                            <span className="text-success">
                                                <i className="ri-checkbox-circle-fill me-1"></i> Authenticated
                                            </span> :
                                            <span className="text-warning">
                                                <i className="ri-error-warning-fill me-1"></i> Needs authentication
                                            </span>
                                        }
                                    </p>
                                </div>
                            )}

                            {enabled.slack && (
                                <div className="mb-4">
                                    <h5>Slack</h5>
                                    <p className="text-muted">
                                        {authStatus.slack ?
                                            <span className="text-success">
                                                <i className="ri-checkbox-circle-fill me-1"></i> Authenticated
                                            </span> :
                                            <span className="text-warning">
                                                <i className="ri-error-warning-fill me-1"></i> Needs authentication
                                            </span>
                                        }
                                    </p>
                                </div>
                            )}

                            {enabled.gmail && (
                                <div>
                                    <h5>Gmail</h5>
                                    <p className="text-muted">
                                        {authStatus.gmail ?
                                            <span className="text-success">
                                                <i className="ri-checkbox-circle-fill me-1"></i> Authenticated
                                            </span> :
                                            <span className="text-warning">
                                                <i className="ri-error-warning-fill me-1"></i> Needs authentication
                                            </span>
                                        }
                                    </p>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                )}
            </Col>
        </Row>
    );
}