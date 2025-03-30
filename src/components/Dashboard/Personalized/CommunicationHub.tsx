"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, Table, Dropdown } from "react-bootstrap";

const CommunicationHub = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items per page

  useEffect(() => {
    // Simulate API call
    const mockOrders = [
      // Add more mock data to test pagination
      {
        image: "/images/icons/icons8-gmail-48.png",
        sender: "Lucan Tran",
        summary: "Bug Fix Needs Sprint Reprioritization",
        action: "Reply",
        priority: "Low"
      },
      {
        image: "/images/icons/icons8-slack-80.png",
        sender: "Rachel Park",
        summary: "Review Launch Email Plan",
        action: "Review",
        priority: "Medium"
      },
      {
        image: "/images/icons/icons8-notion-48.png",
        sender: "Chambiar System",
        summary: "Updated Forecast",
        action: "Approval",
        priority: "High"
      },
      {
        image: "/images/icons/icons8-gmail-48.png",
        sender: "Diana Cruz",
        summary: "Compilance Docs Due Today",
        action: "Reply",
        priority: "High"
      },
      {
        image: "/images/icons/hubspot-256.png",
        sender: "Sarah Liang",
        summary: "Client Call Summary Posted",
        action: "Review",
        priority: "Medium"
      },
      {
        image: "/images/icons/icons8-slack-80.png",
        sender: "Michael Riley",
        summary: "Final Approval Needed - Q2 Designs",
        action: "Approval",
        priority: "High"
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
          <h3 className="mb-0 text-secondary-50">Communication Hub</h3>

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
                      Platform
                    </span>
                  </th>
                  <th className="bg-transparent text-body fw-medium">
                    <span className="fs-10 text-body-color-60 fw-bold letter-spacing-1">
                      Sender
                    </span>
                  </th>
                  <th className="bg-transparent text-body fw-medium">
                    <span className="fs-10 text-body-color-60 fw-bold letter-spacing-1">
                      Summary
                    </span>
                  </th>
                  <th className="bg-transparent text-body fw-medium">
                    <span className="fs-10 text-body-color-60 fw-bold letter-spacing-1">
                      Action
                    </span>
                  </th>
                  <th className="bg-transparent text-body fw-medium">
                    <span className="fs-10 text-body-color-60 fw-bold letter-spacing-1">
                      Priority
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((order) => (
                  <tr key={order.code}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <Image
                            src={order.image}
                            className="rounded-circle"
                            alt="order"
                            width={30}
                            height={30}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="fs-12 fw-semibold text-body-color-50">
                      {order.sender}
                    </td>
                    <td className="fs-12 fw-semibold text-body-color-50">
                      {order.summary}
                    </td>
                    <td className="fs-12 fw-semibold text-body-color-50">
                      {order.action}
                    </td>
                    <td className="fs-12 fw-semibold text-body-color-50">
                      {order.priority}
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
                        className={`page-link ${
                          currentPage === page ? "active" : ""
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

export default CommunicationHub;
