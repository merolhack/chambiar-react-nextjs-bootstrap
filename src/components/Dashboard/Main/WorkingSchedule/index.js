"use client";

import { useState } from 'react';
import Calendar from 'react-calendar';
import { Card, Row, Col } from "react-bootstrap";

import UpcomingEvents from "./UpcomingEvents";

const WorkingSchedule = () => {

  const [value, setValue] = useState(new Date());

  return (
    <>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">

          <Row>
            <Col sm={8}>
              <div className="mb-3 mb-lg-4">
                <h3 className="mb-0">Calendar</h3>
              </div>
              <Calendar onChange={setValue} value={value} />
            </Col>
            <Col sm={4}>
              <UpcomingEvents />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default WorkingSchedule;

