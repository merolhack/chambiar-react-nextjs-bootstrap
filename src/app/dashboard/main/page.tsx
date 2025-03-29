// app/dashboard/main/page.tsx
'use client';

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
import CommunicationHub from "@/components/Dashboard/Main/CommunicationHub";

import { Row, Col } from "react-bootstrap";

import { withAuth } from '@/components/withAuth';

function Page() {
  return (
    <>
      <Row className="justify-content-center">
        <Col xxl={6}>
          <Row>
            <Col sm={12}>
              <Avatar />
            </Col>
            <Col sm={12}>
              <TopActionItems />
            </Col>
          </Row>
        </Col>

        <Col xxl={6}>
          <WorkingSchedule />

          <KeyMeetingsAndSummaries />
        </Col>

        <Col lg={12}>
          <AIRecommendationsAndInsights />
        </Col>

        <Col lg={12}>
          <RecentOrdersList />
        </Col>

        <Col xxl={3}>
          <OrderSummary />
        </Col>

        <Col lg={6} xxl={6}>
          <RevenueVSExpense />
        </Col>

        <Col xxl={3} lg={6}>
          <LowStockAlerts />
        </Col>

        <Col lg={6} md={6} xl={6} xxl={4}>
          <StaffPerformanceScores />
        </Col>

        <Col lg={6} md={6} xl={6} xxl={4}>
          <RevenueByBranches />
        </Col>

        <Col lg={6} md={6} xl={6} xxl={4}>
          <Tickets />
        </Col>


      </Row>
    </>
  );
}

export default withAuth(Page);
