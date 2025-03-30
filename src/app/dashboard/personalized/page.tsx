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

import styles from '../../../../styles/animations.module.css';

function Page({ layoutRef }) {
  const [visibleComponents, setVisibleComponents] = useState<string[]>([]);
  const [conversationStarted, setConversationStarted] = useState(false);
  const componentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const prevVisibleComponents = useRef<string[]>([]); // Track previous state

  // Scroll to new components when they appear
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

  const handleVideoEnd = (showComponents?: string[]) => {
    if (showComponents) {
      setVisibleComponents(prev => [...new Set([...prev, ...showComponents])]); // Ensure unique components
    }
  };

  const registerRef = (componentName: string) => (el: HTMLDivElement | null) => {
    componentRefs.current[componentName] = el;
    if (el) {
      el.classList.add(styles['scroll-margin']);
    }
  };

  const handleConversationStart = () => {
    setConversationStarted(true);
    
    const componentsOrder = [
      'TopActionItems',
      'WorkingSchedule', 
      'CommunicationHub',
      'AIInsights',
      'DailyTaskList',
      'KeyMetrics',
      'WorkEngineReport'
    ];

    componentsOrder.forEach((component, index) => {
      setTimeout(() => {
        setVisibleComponents(prev => [...prev, component]);
      }, index * 2000); // 2 seconds delay between each component
    });
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
              <Col xxl={12} lg={12} sm={12} className={`${styles.slideIn} ${styles['delay-1']}`} ref={registerRef('TopActionItems')}>
                <TopActionItems />
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {isComponentVisible('CommunicationHub') && (
          <Col xxl={12} lg={12} sm={12} className={`${styles.slideIn} ${styles['delay-2']}`} ref={registerRef('CommunicationHub')}>
            <CommunicationHub />
          </Col>
        )}
      </Row>
      <Row className="justify-content-center">
        {isComponentVisible('AIInsights') && (
          <Col xxl={12} lg={12} sm={12} className={`${styles.slideIn} ${styles['delay-3']}`} ref={registerRef('AIInsights')}>
            <AIInsights />
          </Col>
        )}
      </Row>
      <Row className="justify-content-center">
        {isComponentVisible('DailyTaskList') && (
          <Col xs={8} md={8} lg={8} xl={8} xxl={8} className={`${styles.slideIn} ${styles['delay-3']}`} ref={registerRef('DailyTaskList')}>
            <DailyTaskList />
          </Col>
        )}
        {isComponentVisible('KeyMetrics') && (
          <Col xs={4} md={4} lg={4} xl={4} xxl={4} className={`${styles.slideIn} ${styles['delay-3']}`} ref={registerRef('KeyMetrics')}>
            <KeyMetrics />
          </Col>
        )}
      </Row >
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
