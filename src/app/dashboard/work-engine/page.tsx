// app/dashboard/work-engine/page.tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react'; // Add useCallback
import { Row, Col } from "react-bootstrap";

import LayoutProvider from '@/providers/LayoutProvider';
import { withAuth } from '@/components/withAuth';

import AnalyticsOverview from "@/components/Dashboard/WorkEngine/AnalyticsOverview";
import Stats from "@/components/Dashboard/WorkEngine/Stats";
import RealtimeActiveUsers from "@/components/Dashboard/WorkEngine/RealtimeActiveUsers";
import BrowserUsedByUsers from "@/components/Dashboard/WorkEngine/BrowserUsedByUsers";
import DeviceSessions from "@/components/Dashboard/WorkEngine/DeviceSessions";
import Clicks from "@/components/Dashboard/Analytics/Clicks";
import Impressions from "@/components/Dashboard/Analytics/Impressions";
import Sessions from "@/components/Dashboard/Analytics/Sessions";
import SessionsByChannel from "@/components/Dashboard/WorkEngine/SessionsByChannel";
import ClicksByKeywords from "@/components/Dashboard/WorkEngine/ClicksByKeywords";
import TopBrowsingPagesToday from "@/components/Dashboard/WorkEngine/TopBrowsingPagesToday";
import TopBrowsingPagesTodayV2 from "@/components/Dashboard/WorkEngine/TopBrowsingPagesTodayV2";
import AvatarWorkEngine from "@/components/Dashboard/WorkEngine/AvatarWorkEngine";

import styles from '../../../../styles/animations.module.css';

function Page({ layoutRef }) {
  const [visibleComponents, setVisibleComponents] = useState<string[]>([]);
  const [conversationStarted, setConversationStarted] = useState(false);
  const componentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const prevVisibleComponents = useRef<string[]>([]);

  useEffect(() => {
    const newComponents = visibleComponents.filter(
      component => !prevVisibleComponents.current.includes(component)
    );
    
    newComponents.forEach(component => {
      const ref = componentRefs.current[component];
      if (ref) {
        ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    prevVisibleComponents.current = visibleComponents;
  }, [visibleComponents]);

  // Memoize the registerRef function
  const registerRef = useCallback((componentName: string) => (el: HTMLDivElement | null) => {
    componentRefs.current[componentName] = el;
    if (el) {
      el.classList.add(styles['scroll-margin']);
    }
  }, []);

  // Wrap handlers with useCallback
  const handleVideoEnd = useCallback((showComponents?: string[]) => {
    if (showComponents) {
      setVisibleComponents(prev => [...new Set([...prev, ...showComponents])]);
    }
  }, []);

  const handleConversationStart = useCallback(() => {
    setConversationStarted(true);
    setVisibleComponents([]);
    
    const componentsOrder = [
      'RealtimeActiveUsers',
      'AnalyticsOverview',
      'TopBrowsingPagesToday',
      'BrowserUsedByUsers',
      'DeviceSessions',
      'Clicks',
      'Impressions',
      'Sessions',
      'SessionsByChannel',
      'ClicksByKeywords',
      'TopBrowsingPagesTodayV2'
    ];

    componentsOrder.forEach((component, index) => {
      setTimeout(() => {
        setVisibleComponents(prev => [...prev, component]);
      }, index * 2000);
    });
  }, []); // Empty dependency array ensures stable reference

  const isComponentVisible = (componentName: string) => {
    return conversationStarted && visibleComponents.includes(componentName);
  };

  return (
    <>
      <Row>
        <Col xs={6} sm={6} lg={6} xl={6} xxl={6}>
          <AvatarWorkEngine
            onVideoEnd={handleVideoEnd}
            onConversationStart={handleConversationStart}
          />
          {isComponentVisible('AnalyticsOverview') && (
            <div className={`${styles.slideIn} ${styles['delay-1']}`} ref={registerRef('AnalyticsOverview')}>
              <AnalyticsOverview />
            </div>
          )}
        </Col>
        {isComponentVisible('RealtimeActiveUsers') && (
          <Col xs={6} sm={6} lg={6} xl={6} xxl={6} className={`${styles.slideIn} ${styles['delay-2']}`} ref={registerRef('RealtimeActiveUsers')}>
            <RealtimeActiveUsers />
          </Col>
        )}
      </Row>
      <Row>
        {isComponentVisible('TopBrowsingPagesToday') && (
          <Col xs={12} md={12} lg={12} xl={12} xxl={8} className={`${styles.slideIn} ${styles['delay-10']}`} ref={registerRef('TopBrowsingPagesToday')}>
            <TopBrowsingPagesToday />
          </Col>
        )}

      </Row>

      <Row>
        {isComponentVisible('BrowserUsedByUsers') && (
          <Col xs={12} lg={12} xl={12} xxl={7} className={`${styles.slideIn} ${styles['delay-3']}`} ref={registerRef('BrowserUsedByUsers')}>
            <BrowserUsedByUsers />
          </Col>
        )}

        {isComponentVisible('DeviceSessions') && (
          <Col xs={12} lg={12} xl={12} xxl={5} className={`${styles.slideIn} ${styles['delay-4']}`} ref={registerRef('DeviceSessions')}>
            <DeviceSessions />
          </Col>
        )}
      </Row>

      <Row>
        {isComponentVisible('SessionsByChannel') && (
          <Col xs={12} md={12} lg={12} xl={5} className={`${styles.slideIn} ${styles['delay-8']}`} ref={registerRef('SessionsByChannel')}>
            <SessionsByChannel />
          </Col>
        )}

        {isComponentVisible('ClicksByKeywords') && (
          <Col xs={12} md={12} lg={12} xl={7} className={`${styles.slideIn} ${styles['delay-9']}`} ref={registerRef('ClicksByKeywords')}>
            <ClicksByKeywords />
          </Col>
        )}
      </Row>

      

      <Row>
        {isComponentVisible('TopBrowsingPagesTodayV2') && (
          <Col xs={12} md={12} lg={12} xl={12} xxl={12} className={`${styles.slideIn} ${styles['delay-12']}`} ref={registerRef('TopBrowsingPagesTodayV2')}>
            <TopBrowsingPagesTodayV2 />
          </Col>
        )}
      </Row>
    </>
  );
}

function PageWrapper() {
  const layoutRef = useRef(null);
  
  return (
    <LayoutProvider ref={layoutRef}>
      <Page layoutRef={layoutRef} />
    </LayoutProvider>
  );
}

export default withAuth(PageWrapper);
