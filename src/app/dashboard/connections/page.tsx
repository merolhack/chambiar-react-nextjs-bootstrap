// app/dashboard/connections/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

import LayoutProvider from '@/providers/LayoutProvider';
import { Row, Col } from "react-bootstrap";
import { withAuth } from '@/components/withAuth';
import ConnectedIntegrations from './ConnectedIntegrations';

function Page({ layoutRef }) {
    return (
        <>
            <Row>
                <Col md={12}>
                    <ConnectedIntegrations />
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