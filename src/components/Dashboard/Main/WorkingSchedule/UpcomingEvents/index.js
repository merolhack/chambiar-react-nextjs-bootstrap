"use client";

import { Card } from "react-bootstrap";

const UpcomingEvents = () => {
  return (
    <>
      <div className="upcoming-events position-relative">
        <Card className="bg-white border-0 rounded-3 mb-4">
          <Card.Body className="p-4">
            <div className="mb-3 mb-lg-4">

            </div>

            <div className="upcoming-events-list">
              <Card className="bg-chambiar-bg border-0 rounded-3 mb-4">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <h4 className="fs-18 fw-semibold text-dark">10:00 AM</h4>
                  </div>
                  <p className="text-secondary fs-15 mb-0">
                    Product sync
                  </p>
                </Card.Body>
              </Card>
              <Card className="bg-chambiar-bg border-0 rounded-3 mb-4">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <h4 className="fs-18 fw-semibold text-dark">1:00 PM</h4>
                  </div>
                  <p className="text-secondary fs-15 mb-0">
                    Vendor review
                  </p>
                </Card.Body>
              </Card>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default UpcomingEvents;
