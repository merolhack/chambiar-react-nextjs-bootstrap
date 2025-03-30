"use client";

import React, { useEffect, useState } from "react";
import { Card, Row, Col, Dropdown } from "react-bootstrap";

const WorkEngineReport = () => {
    return (
        <>
            <Card className="bg-white border-0 rounded-3 mb-4 z-0">
                <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <h3 className="mb-0 text-secondary-50">Work Engine Report</h3>

                        <Dropdown className="dropdown select-dropdown">
                            <Dropdown.Toggle
                                variant="secondary"
                                id="dropdown-basic"
                                className="dropdown-toggle bg-border-color border text-body rounded-2"
                            >
                                Monthly
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
                    <Row className="justify-content-center">
                        <Col xs={3} md={3} lg={3} xl={3} xxl={3}>
                            <div className="gap-3 border border-4 border-dark rounded-3 p-3">
                                <p>Task Completed: 82%</p>
                                <p>Stategic Work: 67%</p>
                                <p>KPI-Aligned Tasks: 71%</p>
                                <p>Equity Index: 89%</p>
                            </div>
                            <h4 className="pt-md-2 text-center">Snapshot</h4>
                        </Col>
                        <Col xs={3} md={3} lg={3} xl={3} xxl={3}>
                            <div className="gap-3 border border-4 border-dark rounded-3 p-3">
                                <p>Focus Time Ratio: 46%</p>
                                <p>Avg. Context Switch/Day: 5.3</p>
                                <p>Admin Load: 13.6 hrs</p>
                                <p>Burout Risk Moderate</p>
                            </div>
                            <h4 className="pt-md-2 text-center">Focus & Balance</h4>
                        </Col>
                        <Col xs={3} md={3} lg={3} xl={3} xxl={3}>
                            <div className="gap-3 border border-4 border-dark rounded-3 p-3">
                                <p>Smart Actions: 21</p>
                                <p>Hours Saved: 8.6</p>
                                <p>OEI: 81 (+9)</p>
                                <p>Revenue Saved: $1,560.00</p>
                            </div>
                            <h4 className="pt-md-2 text-center">Efficiency</h4>
                        </Col>
                        <Col xs={3} md={3} lg={3} xl={3} xxl={3}>
                            <div className="gap-3 border border-4 border-dark rounded-3 p-3">
                                <p>Cancel Monday Status Meeting</p>
                                <p>Accept ownership of Q3 Launch plan</p>
                                <p>Next (Wed/Fri) Focus days</p>
                                <p>Migrate backlog cleanup</p>
                            </div>
                            <h4 className="pt-md-2 text-center">Insights</h4>
                        </Col>
                    </Row>
                </Card.Body>
            </Card >
        </>
    );
};

export default WorkEngineReport;