"use client";

import React from "react";
import Link from "next/link";
import { Row, Col, Card, Dropdown } from "react-bootstrap";
import context from "react-bootstrap/esm/AccordionContext";

const topActionItems = [
  {
    id: 1,
    name: "Approve Q2 Hiring Plan",
    context: "The task is tied to a company wide hiring goal and blocks 2 other...",
    action: "Review & Approve by 3am",
  },
  {
    id: 2,
    name: "Delegate two tasks",
    context: "Your focus time ratio dropped below 30% offboard these low priorities",
    action: "Free 2.4 hours this week",
  },
  {
    id: 3,
    name: "Product launch",
    context: "Coworker attending meeting, your shared notes. More follow up required",
    action: "Send feedback EOD or schedule...",
  }
];

const TopActionItems = () => {
  return (
    <>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <h3 className="mb-0 text-secondary-50">Top Action</h3>

            <Dropdown className="dropdown select-dropdown">
              <Dropdown.Toggle
                variant="secondary"
                id="dropdown-basic"
                className="dropdown-toggle bg-border-color border text-body rounded-2"
              >
                Weekly
              </Dropdown.Toggle>

              <Dropdown.Menu className="bg-white border box-shadow">
                <Dropdown.Item href="#" className="text-secondary py-2 px-3">
                  Weekly
                </Dropdown.Item>

                <Dropdown.Item href="#" className="text-secondary py-2 px-3">
                  Monthly
                </Dropdown.Item>

                <Dropdown.Item href="#" className="text-secondary py-2 px-3">
                  Yearly
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>


          {topActionItems.slice(0, 4).map((item) => (
            <Row>
              <Col key={item.id} sm={12} md={12}>
                <h5 className="fs-14 fw-semibold mb-0 text-secondary-50">
                  {item.name}
                </h5>
                <Row>
                  <Col sm={8}>
                    <h6>Context:</h6>
                    <p className="fs-12 fw-medium text-body">
                      {item.context}
                    </p>
                  </Col>
                  <Col sm={4}>
                    <h6>Action:</h6>
                    <p className="fs-12 fw-medium text-body">
                      {item.action}
                    </p>
                  </Col>
                </Row>

              </Col>
            </Row>
          ))}

        </Card.Body>
      </Card>
    </>
  );
};

export default TopActionItems;
