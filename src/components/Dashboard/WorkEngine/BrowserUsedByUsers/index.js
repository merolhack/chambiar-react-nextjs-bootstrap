// components/Dashboard/WorkEngine/BrowserUsedByUsers
"use client";

import React, { useState } from "react";
import { Card, Form, Table } from "react-bootstrap";
import Image from "next/image";

const BrowserUsedByUsers = () => {
  const [browserData] = useState([
    {
      action: "2 admin taks moved to shared ops pool",
      timeSaved: "2 hrs",
      outcome: "Optimization",
    },
    {
      action: "Grouped 3 similar tasks into one workflow",
      timeSaved: "10 hrs",
      outcome: "Optimization",
    },
    {
      action: "Removed duplicate Jira ticket from Asana task",
      timeSaved: "3 hrs",
      outcome: "Optimization",
    },
    {
      action: "Auto-snoozed non-urgent tasks after 6pm",
      timeSaved: "2 hrs",
      outcome: "Eficciency",
    },
    {
      action: "AI Coworker attended meeting",
      timeSaved: "2 hrs",
      outcome: "Automation",
    },
    {
      action: "Design review summary posted to notion",
      timeSaved: "1 hr",
      outcome: "Automation",
    },
  ]);

  return (
    <Card className="bg-white border-0 rounded-3 mb-4">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 pb-4">
          <h3 className="mb-0">Maria Rogers</h3>

          <Form.Select
            className="form-select month-select form-control p-0 h-auto border-0 pe-4 w-auto"
          >
            <option defaultValue="0">July 01 - July 31, 2024</option>
            <option defaultValue="1">August 01 - August 31, 2024</option>
            <option defaultValue="2">September 01 - September 30, 2024</option>
          </Form.Select>
        </div>

        <div className="default-table-area style-two browser-leads">
          <div 
            className="table-responsive"
            style={{ 
              maxHeight: '282px',
              overflowY: 'auto'
            }}
          >
            <Table className="align-middle border-0 analytics-bu-by-users">
              <thead>
                <tr className="border-bottom">
                  <th scope="col" className="text-center bg-transparent">Action</th>
                  <th scope="col" className="text-end bg-transparent">Time saved</th>
                  <th scope="col" className="text-end bg-transparent">Outcome</th>
                </tr>
              </thead>
              <tbody>
                {browserData.map((browser, index) => (
                  <tr key={index}>
                    <td className="text-start fw-medium">{browser.action}</td>
                    <td className="text-end fw-medium">{browser.timeSaved}</td>
                    <td className="text-end fw-medium">{browser.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BrowserUsedByUsers;
