// app/dashboard/personalized/page.tsx
'use client';

import { useState } from 'react';

import Avatar from "@/components/Dashboard/Personalized/Avatar";

import { Row, Col } from "react-bootstrap";

import { withAuth } from '@/components/withAuth';

function Page() {
  const [visibleComponents, setVisibleComponents] = useState<string[]>([]);
  const [conversationStarted, setConversationStarted] = useState(false);

  const handleVideoEnd = (showComponents?: string[]) => {
    if (showComponents) {
      setVisibleComponents(prev => [...new Set([...prev, ...showComponents])]); // Ensure unique components
    }
  };

  const handleConversationStart = () => {
    setConversationStarted(true);
    setVisibleComponents([]); // Hide all components when conversation starts
  };

  const isComponentVisible = (componentName: string) => {
    // Only show if in visibleComponents AND conversation has started
    return conversationStarted && visibleComponents.includes(componentName);
  };

  return (
    <>
      <Row className="justify-content-center">
        {/* Avatar is always visible */}
        <Col xxl={6}>
          <Row>
            <Col sm={12}>
              <Avatar
                onVideoEnd={handleVideoEnd}
                onConversationStart={handleConversationStart}
              />
            </Col>

            {/* Other components - only show if visible */}
            {isComponentVisible('TopActionItems') && (
              <Col sm={12}>

              </Col>
            )}
          </Row>
        </Col>

        <Col xxl={6}>
          <Row className="justify-content-center">
            {isComponentVisible('TopActions') && (
              <Col xxl={4} lg={4} sm={4}>

              </Col>)}
          </Row>
          <Row className="justify-content-center">
            {isComponentVisible('TopEmails') && (
              <Col xxl={4} lg={4} sm={4}>

              </Col>)}
          </Row>
          <Row className="justify-content-center">
            {isComponentVisible('TopMeetings') && (
              <Col xxl={4} lg={4} sm={4}>

              </Col>)}
          </Row>
        </Col>

      </Row>
    </>
  );
}

export default withAuth(Page);
