// app/dashboard/personalized/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

import LayoutProvider from '@/providers/LayoutProvider';

import Avatar from "@/components/Dashboard/Personalized/Avatar";

import { Row, Col } from "react-bootstrap";

import { withAuth } from '@/components/withAuth';

import TopActionItems from "@/components/Dashboard/Main/TopActionItems";
import WorkingSchedule from "@/components/Dashboard/Main/WorkingSchedule";
import CommunicationHub from "@/components/Dashboard/Personalized/CommunicationHub";
import AIInsights from "@/components/Dashboard/Personalized/AIInsights";
import DailyTaskList from "@/components/Dashboard/Personalized/DailyTaskList";
import KeyMetrics from "@/components/Dashboard/Personalized/KeyMetrics";
import WorkEngineReport from "@/components/Dashboard/Personalized/WorkEngineReport";

function Page({ layoutRef }) {
  const [visibleComponents, setVisibleComponents] = useState<string[]>([]);
  const [conversationStarted, setConversationStarted] = useState(false);

  const handleVideoEnd = (showComponents?: string[]) => {
    if (showComponents) {
      setVisibleComponents(prev => [...new Set([...prev, ...showComponents])]); // Ensure unique components
    }
  };

  const handleConversationStart = () => {
    setConversationStarted(true);
    setVisibleComponents(['WorkingSchedule', 'TopActionItems', 'CommunicationHub', 'AIInsights', 'DailyTaskList', 'KeyMetrics', 'WorkEngineReport']); // Hide all components when conversation starts
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
              {isComponentVisible('WorkingSchedule') && (
                <WorkingSchedule />
              )}
            </Col>
          </Row>
        </Col>

        <Col xxl={6}>
          <Row className="justify-content-center">
            {isComponentVisible('TopActionItems') && (
              <Col sm={12}>
                <TopActionItems />
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {isComponentVisible('CommunicationHub') && (
          <Col sm={12}>
            <CommunicationHub />
          </Col>
        )}
      </Row>
      <Row className="justify-content-center">
        {isComponentVisible('AIInsights') && (
          <Col sm={12}>
            <AIInsights />
          </Col>
        )}
      </Row>
      <Row className="justify-content-center">
        {isComponentVisible('DailyTaskList') && (
          <Col xs={8} md={8} lg={8} xl={8} xxl={8}>
            <DailyTaskList />
          </Col>
        )}
        {isComponentVisible('KeyMetrics') && (
          <Col xs={4} md={4} lg={4} xl={4} xxl={4}>
            <KeyMetrics />
          </Col>
        )}
      </Row>
      <Row className="justify-content-center">
        {isComponentVisible('WorkEngineReport') && (
          <Col sm={12}>
            <WorkEngineReport />
          </Col>
        )}
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
