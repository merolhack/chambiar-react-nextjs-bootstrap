"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, Table, Dropdown } from "react-bootstrap";

const AIInsights = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items per page

  useEffect(() => {
    // Simulate API call
    const mockOrders = [
      // Add more mock data to test pagination
      {
        insight: "Removed duplicates",
        outcome: "Q2 projects merged",
        category: "Workflow optimization",
        oeiImpact: "6",
        moneySaved: "$180",
      },
      {
        insight: "Meeting Skipped",
        outcome: "Meeting Skipped",
        category: "Meeting Efficiency",
        oeiImpact: "4",
        moneySaved: "$90",
      },
      {
        insight: "Unblocked Teams",
        outcome: "Contract approved",
        category: "Strategic Enablement",
        oeiImpact: "8",
        moneySaved: "$240",
      },
      {
        insight: "Restored Focus",
        outcome: "Focus time created",
        category: "Focus time",
        oeiImpact: "5",
        moneySaved: "$150",
      },
      {
        insight: "Merged Tasks",
        outcome: "Task grouped",
        category: "Task Consolidation",
        oeiImpact: "7",
        moneySaved: "$120",
      },
      {
        insight: "Resolved duplication",
        outcome: "Roadmap consolidated",
        category: "Cross-team Alignment",
        oeiImpact: "12",
        moneySaved: "$1,050",
      },
      {
        insight: "Removed duplicates",
        outcome: "Q2 projects merged",
        category: "Workflow optimization",
        oeiImpact: "6",
        moneySaved: "$180",
      },
      {
        insight: "Meeting Skipped",
        outcome: "Meeting Skipped",
        category: "Meeting Efficiency",
        oeiImpact: "4",
        moneySaved: "$90",
      },
      {
        insight: "Unblocked Teams",
        outcome: "Contract approved",
        category: "Strategic Enablement",
        oeiImpact: "8",
        moneySaved: "$240",
      },
      {
        insight: "Restored Focus",
        outcome: "Focus time created",
        category: "Focus time",
        oeiImpact: "5",
        moneySaved: "$150",
      },
      {
        insight: "Merged Tasks",
        outcome: "Task grouped",
        category: "Task Consolidation",
        oeiImpact: "7",
        moneySaved: "$120",
      },
      {
        insight: "Resolved duplication",
        outcome: "Roadmap consolidated",
        category: "Cross-team Alignment",
        oeiImpact: "12",
        moneySaved: "$1,050",
      },
    ];

    setOrders(mockOrders);
  }, []);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Card className="bg-white border-0 rounded-3 mb-4">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <h3 className="mb-0 text-secondary-50">AI Insights</h3>

          <Dropdown className="dropdown select-dropdown">
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              className="dropdown-toggle bg-border-color border text-body rounded-2"
            >

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

        <div className="default-table-area style-two campaigns-table recent-order-list-table">
          <div className="table-responsive">
            <Table className="align-middle border-0">
              <thead>
                <tr className="border-bottom">
                  <th className="bg-transparent text-body fw-medium">
                    <span className="fs-10 text-body-color-60 fw-bold letter-spacing-1">
                      INSIGHT
                    </span>
                  </th>
                  <th className="bg-transparent text-body fw-medium">
                    <span className="fs-10 text-body-color-60 fw-bold letter-spacing-1">
                      OUTCOME
                    </span>
                  </th>
                  <th className="bg-transparent text-body fw-medium">
                    <span className="fs-10 text-body-color-60 fw-bold letter-spacing-1">
                      CATEGORY
                    </span>
                  </th>
                  <th className="bg-transparent text-body fw-medium">
                    <span className="fs-10 text-body-color-60 fw-bold letter-spacing-1">
                      OEI IMPACT
                    </span>
                  </th>
                  <th className="bg-transparent text-body fw-medium">
                    <span className="fs-10 text-body-color-60 fw-bold letter-spacing-1">
                      $ SAVED
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((order) => (
                  <tr key={order.code}>
                     <td className="fs-12 fw-semibold text-body-color-50">
                      {order.insight}
                    </td>
                    <td className="fs-12 fw-semibold text-body-color-50">
                      {order.outcome}
                    </td>
                    <td className="fs-12 fw-semibold text-body-color-50">
                      {order.category}
                    </td>
                    <td className="fs-12 fw-semibold text-body-color-50">
                      {order.oeiImpact}
                    </td>
                    <td className="fs-12 fw-semibold text-body-color-50">
                      {order.moneySaved}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="d-flex justify-content-center justify-content-sm-between align-items-center text-center flex-wrap gap-2 showing-wrap mt-4">
            <span className="fs-12 fw-medium">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, orders.length)} of {orders.length}{" "}
              Results
            </span>

            <nav aria-label="Page navigation example">
              <ul className="pagination mb-0 justify-content-center">
                <li className="page-item">
                  <button
                    onClick={handlePrevious}
                    className="page-link icon hover-bg"
                    disabled={currentPage === 1}
                  >
                    <i className="material-symbols-outlined">
                      keyboard_arrow_left
                    </i>
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <li key={page} className="page-item">
                      <button
                        onClick={() => handlePageChange(page)}
                        className={`page-link ${currentPage === page ? "active" : ""
                          }`}
                      >
                        {page}
                      </button>
                    </li>
                  )
                )}
                <li className="page-item">
                  <button
                    onClick={handleNext}
                    className="page-link icon hover-bg"
                    disabled={currentPage === totalPages}
                  >
                    <i className="material-symbols-outlined">
                      keyboard_arrow_right
                    </i>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AIInsights;
