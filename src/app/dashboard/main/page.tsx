// app/dashboard/main/page.tsx
'use client';

import { useState } from 'react';

import CustomerRatings from "@/components/Dashboard/Restaurant/CustomerRatings";
import Expense from "@/components/Dashboard/Restaurant/Expense";
import LowStockAlerts from "@/components/Dashboard/Restaurant/LowStockAlerts";
import OrderSummary from "@/components/Dashboard/Restaurant/OrderSummary";
import PendingOrders from "@/components/Dashboard/Restaurant/PendingOrders";
import RecentOrdersList from "@/components/Dashboard/Restaurant/RecentOrdersList";
import Revenue from "@/components/Dashboard/Restaurant/Revenue";
import RevenueByBranches from "@/components/Dashboard/Restaurant/RevenueByBranches";
import RevenueVSExpense from "@/components/Dashboard/Restaurant/RevenueVSExpense";
import StaffPerformanceScores from "@/components/Dashboard/Restaurant/StaffPerformanceScores";
import Tickets from "@/components/Dashboard/Restaurant/Tickets";
import Order from "@/components/Dashboard/Restaurant/TotalOrders";

import Avatar from "@/components/Dashboard/Main/Avatar";
import TopActionItems from "@/components/Dashboard/Main/TopActionItems";
import WorkingSchedule from "@/components/Dashboard/Main/WorkingSchedule";
import KeyMeetingsAndSummaries from "@/components/Dashboard/Main/KeyMeetingsAndSummaries";
import AIRecommendationsAndInsights from "@/components/Dashboard/Main/AIRecommendationsAndInsights";

import TopActions from "@/components/Dashboard/Main/TopActions";
import TopMeetings from "@/components/Dashboard/Main/TopMeetings";
import TopEmails from "@/components/Dashboard/Main/TopEmails";

import AIInsightHubspot from "@/components/Dashboard/Main/AIInsightHubspot";
import HubspotScreenshot from "@/components/Dashboard/Main/HubspotScreenshot";

import AIInsightExcel from "@/components/Dashboard/Main/AIInsightExcel";
import ExcelScreenshot from "@/components/Dashboard/Main/ExcelScreenshot";

import AIInsightNotion from "@/components/Dashboard/Main/AIInsightNotion";
import NotionScreenshot from "@/components/Dashboard/Main/NotionScreenshot";

import CommunicationHub from "@/components/Dashboard/Main/CommunicationHub";

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
                <TopActionItems />
              </Col>
            )}
          </Row>
        </Col>

        <Col xxl={6}>
          <Row className="justify-content-center">
            {isComponentVisible('TopActions') && (
              <Col xxl={4} lg={4} sm={4}>
                <TopActions />
              </Col>)}
          </Row>
          <Row className="justify-content-center">
            {isComponentVisible('TopEmails') && (
              <Col xxl={4} lg={4} sm={4}>
                <TopEmails />
              </Col>)}
          </Row>
          <Row className="justify-content-center">
            {isComponentVisible('TopMeetings') && (
              <Col xxl={4} lg={4} sm={4}>
                <TopMeetings />
              </Col>)}
          </Row>
        </Col>

        <Col xxl={12}>
          <Row className="justify-content-center">
            {isComponentVisible('AIInsightHubspot') && (
              <Col xxl={3} lg={3} sm={3}>
                <AIInsightHubspot />
              </Col>)}
            {isComponentVisible('HubspotScreenshot') && (
              <Col xxl={9} lg={9} sm={9}>
                <HubspotScreenshot />
              </Col>)}
          </Row>
        </Col>

        <Col xxl={12}>
          <Row className="justify-content-center">
            {isComponentVisible('AIInsightExcel') && (
              <Col xxl={3} lg={3} sm={3}>
                <AIInsightExcel />
              </Col>)}
            {isComponentVisible('ExcelScreenshot') && (
              <Col xxl={9} lg={9} sm={9}>
                <ExcelScreenshot />
              </Col>)}
          </Row>
        </Col>

        <Col xxl={12}>
          <Row className="justify-content-center">
            {isComponentVisible('AIInsightNotion') && (
              <Col xxl={3} lg={3} sm={3}>
                <AIInsightNotion />
              </Col>)}
            {isComponentVisible('NotionScreenshot') && (
              <Col xxl={9} lg={9} sm={9}>
                <NotionScreenshot />
              </Col>)}
          </Row>
        </Col>

        <Col xxl={6}>
          {isComponentVisible('WorkingSchedule') && <WorkingSchedule />}
          {isComponentVisible('KeyMeetingsAndSummaries') && <KeyMeetingsAndSummaries />}
        </Col>

        {/* Other components with visibility checks */}
        {isComponentVisible('AIRecommendationsAndInsights') && (
          <Col lg={12}>
            <AIRecommendationsAndInsights />
          </Col>
        )}

        {isComponentVisible('RecentOrdersList') && (
          <Col lg={12}>
            <RecentOrdersList />
          </Col>
        )}

        {isComponentVisible('OrderSummary') && (
          <Col xxl={3}>
            <OrderSummary />
          </Col>
        )}

        {isComponentVisible('RevenueVSExpense') && (
          <Col lg={6} xxl={6}>
            <RevenueVSExpense />
          </Col>
        )}

        {isComponentVisible('LowStockAlerts') && (
          <Col xxl={3} lg={6}>
            <LowStockAlerts />
          </Col>
        )}

        {isComponentVisible('StaffPerformanceScores') && (
          <Col lg={6} md={6} xl={6} xxl={4}>
            <StaffPerformanceScores />
          </Col>
        )}

        {isComponentVisible('RevenueByBranches') && (
          <Col lg={6} md={6} xl={6} xxl={4}>
            <RevenueByBranches />
          </Col>
        )}

        {isComponentVisible('Tickets') && (
          <Col lg={6} md={6} xl={6} xxl={4}>
            <Tickets />
          </Col>
        )}


      </Row>
    </>
  );
}

export default withAuth(Page);
