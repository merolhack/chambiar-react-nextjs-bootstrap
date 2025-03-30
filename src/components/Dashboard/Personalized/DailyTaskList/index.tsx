// components/Dashboard/Personalized/DailyTaskList/index.tsx
"use client";

import React, { useState } from "react";
import { Card, Form, Table, Button } from "react-bootstrap";

const toDoListData = [
  {
    taskTitle: "Prepare Q2 Report",
    dueTime: "10:30 AM",
    priority: "High",
    status: "Complete",
  },
  {
    taskTitle: "Folow up with Client X",
    dueTime: "12:00 PM",
    priority: "Medium",
    status: "Pending",
  },
  {
    taskTitle: "Team Sync Weekly Progress",
    dueTime: "2:00 PM",
    priority: "Medium",
    status: "Pending",
  },
  {
    taskTitle: "Review Design Space",
    dueTime: "3:00 PM",
    priority: "Low",
    status: "Pending",
  },
  {
    taskTitle: "Send Compliance Documents",
    dueTime: "4:30 PM",
    priority: "High",
    status: "Pending",
  },
];

const ITEMS_PER_PAGE = 5;

const DailyTaskList = () => {
  // Modal
  const [isShowModal, setShowModal] = useState(false);
  const handleToggleShowModal = () => {
    setShowModal((prev) => !prev);
  };

  // Table
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter the to-do list dynamically based on the search query
  const filteredTasks = toDoListData.filter(
    (item) =>
      item.taskTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);

  // Get paginated results based on current page
  const currentItems = filteredTasks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-0">
          <div className="p-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <h3 className="mb-0">Daily Task List</h3>

              <div className="d-flex align-items-center gap-2">
                <Form className="position-relative table-src-form me-0">
                  <Form.Control
                    type="text"
                    placeholder="Search here"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <span className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y">
                    search
                  </span>
                </Form>
              </div>
            </div>
          </div>

          <div className="default-table-area style-two to-do-list padding-style">
            <div className="table-responsive">
              <Table className="align-middle">
                <thead>
                  <tr>
                    <th scope="col">Task</th>
                    <th scope="col">Due</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((item, i) => (
                      <tr key={i}>
                        <td className="text-body">{item.taskTitle}</td>
                        <td className="text-body">{item.dueTime}</td>
                        <td className="text-body text-uppercase">{item.priority}</td>
                        <td className="text-body">{item.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No matching results found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>

              {filteredTasks.length > ITEMS_PER_PAGE && (
                <div className="p-4">
                  <div className="d-flex justify-content-center justify-content-sm-between align-items-center text-center flex-wrap gap-2 showing-wrap">
                    <span className="fs-12 fw-medium">
                      Showing {currentItems.length} of {toDoListData.length}{" "}
                      Results
                    </span>

                    <nav aria-label="Page navigation example">
                      <ul className="pagination mb-0 justify-content-center">
                        <li className="page-item">
                          <button
                            className={`page-link icon btn ${currentPage === 1 ? "disabled" : ""
                              }`}
                            onClick={() =>
                              setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                          >
                            <span className="material-symbols-outlined">
                              keyboard_arrow_left
                            </span>
                          </button>
                        </li>

                        {[...Array(totalPages)].map((_, index) => (
                          <li key={index} className="page-item">
                            <button
                              className={`page-link ${currentPage === index + 1 ? "active" : ""
                                }`}
                              onClick={() => setCurrentPage(index + 1)}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}

                        <li className="page-item">
                          <button
                            className={`page-link icon btn ${currentPage === totalPages ? "disabled" : ""
                              }`}
                            onClick={() =>
                              setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                              )
                            }
                          >
                            <span className="material-symbols-outlined">
                              keyboard_arrow_right
                            </span>
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              )}
              <div className="text-end">
                <button
                  className="btn btn-outline-primary py-1 px-2 px-sm-4 fs-14 fw-medium rounded-3 hover-bg"
                  onClick={handleToggleShowModal}
                >
                  <span className="py-sm-1 d-block">
                    <i className="ri-add-line"></i>
                    <span>Add New Task</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Modal */}
      <div className={`custom-modal right ${isShowModal ? "show" : ""}`}>
        <div className="custom-modal-content position-relative z-3">
          <div className="border-bottom py-3 px-4 d-flex align-items-center justify-content-between">
            <h3 className="fs-18 mb-0">Create Task</h3>

            <div className="close-link" onClick={handleToggleShowModal}>
              <span className="material-symbols-outlined">close</span>
            </div>
          </div>

          <div className="p-4">
            <Form>
              <Form.Group className="mb-4">
                <Form.Label className="label">Task ID</Form.Label>
                <Form.Control
                  type="text"
                  className="text-dark"
                  placeholder="Task ID"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Task Title</Form.Label>
                <Form.Control
                  type="text"
                  className="text-dark"
                  placeholder="Task Title"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Assigned To</Form.Label>
                <Form.Control
                  type="text"
                  className="text-dark"
                  placeholder="Assigned To"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Due Date</Form.Label>
                <Form.Control type="date" className="text-dark" />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Priority</Form.Label>
                <Form.Select
                  className="form-control text-dark"
                  aria-label="Default select example"
                >
                  <option>Select</option>
                  <option defaultValue="0">High</option>
                  <option defaultValue="1">Low</option>
                  <option defaultValue="2">Medium</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Status</Form.Label>
                <Form.Select
                  className="form-control text-dark"
                  aria-label="Default select example"
                >
                  <option>Select</option>
                  <option defaultValue="0">Pending</option>
                  <option defaultValue="1">In Progress</option>
                  <option defaultValue="2">Cancelled</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="label">Action</Form.Label>
                <Form.Select
                  className="form-control text-dark"
                  aria-label="Default select example"
                >
                  <option>Select</option>
                  <option defaultValue="0">Yes</option>
                  <option defaultValue="1">No</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="d-flex gap-3">
                <Button
                  variant="primary"
                  type="submit"
                  className="text-white fw-semibold py-2 px-2 px-sm-3"
                >
                  <span className="py-sm-1 d-block">
                    <i className="ri-add-line text-white"></i>{" "}
                    <span>Create Task</span>
                  </span>
                </Button>
              </Form.Group>
            </Form>
          </div>
        </div>

        <div className="close-outside" onClick={handleToggleShowModal}></div>
      </div>
    </>
  );
};

export default DailyTaskList;
