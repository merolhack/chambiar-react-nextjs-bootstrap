// src/app/dashboard/coworker/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

import { Row, Col } from "react-bootstrap";

import LayoutProvider from '@/providers/LayoutProvider';

import { withAuth } from '@/components/withAuth';

import LiveKitVideoCall from "./LiveKitVideoCall"; // Import the LiveKit component

function Page({ layoutRef }) {
    const [showLiveKitCall, setShowLiveKitCall] = useState(false);

    // Ensure NEXT_PUBLIC_LIVEKIT_URL is available, otherwise provide a fallback or error
    const liveKitServerUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

    const handleLiveKitCallEnd = () => {
        setShowLiveKitCall(false);
        console.log("LiveKit call has ended.");
    };

    return (
        <>
            <Row>
                <Col xs={12} lg={8}>
                    {liveKitServerUrl ? (
                        <Row className="justify-content-center">
                            <Col xs={12} className="p-0"> {/* Use p-0 or adjust padding as needed */}
                                <LiveKitVideoCall
                                    roomName="ChambiarMainDashboardRoom" // Use a dynamic or configured room name
                                    participantName="DashboardUser" // Use a dynamic participant name (e.g., from user data)
                                    serverUrl={liveKitServerUrl}
                                    onCallEnd={handleLiveKitCallEnd}
                                />
                            </Col>
                        </Row>
                    ) : (
                        <Row className="justify-content-center">
                            <Col xs={12}><p className="text-danger p-3">LiveKit URL is not configured. Video call cannot be started.</p></Col>
                        </Row>
                    )}
                </Col>
            </Row>
        </>
    );
}


// Create a wrapper component
function PageWrapper() {
    const layoutRef = useRef(null);

    return (
        <LayoutProvider ref={layoutRef}>
            <Page layoutRef={layoutRef} />
        </LayoutProvider>
    );
}

export default withAuth(PageWrapper);
