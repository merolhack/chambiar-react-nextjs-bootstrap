"use client";

import { Card } from "react-bootstrap";

const UpcomingEvents = () => {
  return (
    <>
      <div className="upcoming-events mt-4 position-relative">
        <Card className="bg-white border-0 rounded-3 mb-4">
          <Card.Body className="p-4">
            <div className="mb-3 mb-lg-4">
              <h3 className="mb-0">Upcoming Events</h3>
            </div>

            <div className="upcoming-events-list">
              <div className="event-item">
                <h5>Project Deadline</h5>
                <p>Due: 2025-05-01</p>
              </div>
              <div className="event-item">
                <h5>Team Meeting</h5>
                <p>Date: 2025-05-03</p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default UpcomingEvents;
