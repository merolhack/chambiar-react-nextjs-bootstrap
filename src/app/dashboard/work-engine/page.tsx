// app/dashboard/work-engine/page.tsx
'use client';

import { useState } from 'react';
import { Row, Col } from "react-bootstrap";

import AnalyticsOverview from "@/components/Dashboard/WorkEngine/AnalyticsOverview";
import Stats from "@/components/Dashboard/WorkEngine/Stats";
import RealtimeActiveUsers from "@/components/Dashboard/WorkEngine/RealtimeActiveUsers";
import BrowserUsedByUsers from "@/components/Dashboard/Analytics/BrowserUsedByUsers";
import DeviceSessions from "@/components/Dashboard/WorkEngine/DeviceSessions";
import Clicks from "@/components/Dashboard/Analytics/Clicks";
import Impressions from "@/components/Dashboard/Analytics/Impressions";
import Sessions from "@/components/Dashboard/Analytics/Sessions";
import SessionsByChannel from "@/components/Dashboard/WorkEngine/SessionsByChannel";
import ClicksByKeywords from "@/components/Dashboard/WorkEngine/ClicksByKeywords";
import TopBrowsingPagesToday from "@/components/Dashboard/WorkEngine/TopBrowsingPagesToday";
import TopBrowsingPagesTodayV2 from "@/components/Dashboard/WorkEngine/TopBrowsingPagesTodayV2";
import UsersByCountry from "@/components/Dashboard/Analytics/UsersByCountry";
import AvatarWorkEngine from "@/components/Dashboard/Main/AvatarWorkEngine";

export default function Page() {
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
      {/* <Row>
        Avatar is always visible
        <Col xs={12} sm={12} lg={8} xl={12} xxl={8}>
          <AvatarWorkEngine
            onVideoEnd={handleVideoEnd}
            onConversationStart={handleConversationStart}
          />
        </Col>
      </Row> */}
      <Row>
        <Col xs={12} sm={12} lg={8} xl={12} xxl={8}>
          <AnalyticsOverview />

          <Stats />
        </Col>

        <Col xs={12} sm={12} lg={4} xl={12} xxl={4}>
          <RealtimeActiveUsers />
        </Col>
      </Row>

      <Row>
        <Col xs={12} lg={12} xl={12} xxl={7}>
          <BrowserUsedByUsers />
        </Col>

        <Col xs={12} lg={12} xl={12} xxl={5}>
          <DeviceSessions />
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} md={6} xl={6} xxl={4}>
          <Clicks />
        </Col>

        <Col xs={12} md={6} xl={6} xxl={4}>
          <Impressions />
        </Col>

        <Col xs={12} md={6} xl={6} xxl={4}>
          <Sessions />
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={12} lg={12} xl={5}>
          <SessionsByChannel />
        </Col>

        <Col xs={12} md={12} lg={12} xl={7}>
          <ClicksByKeywords />
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={12} lg={12} xl={12} xxl={8}>
          <TopBrowsingPagesToday />
        </Col>

        <Col xs={12} md={12} lg={12} xl={12} xxl={4}>
          <UsersByCountry />
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={12} lg={12} xl={12} xxl={12}>
          <TopBrowsingPagesTodayV2 />
        </Col>
      </Row>
    </>
  );
}
