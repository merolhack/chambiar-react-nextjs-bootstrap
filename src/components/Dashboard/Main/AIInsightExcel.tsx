// components/Dashboard/Main/AIInsightExcel.tsx
"use client";

import React, { useState } from "react";
import { Card, Table } from "react-bootstrap";

const AIInsightExcel = () => {
    const [excelData] = useState([
        {
            stock: "Salesforce",
            gain: "$120K+",
            yield: "0%"
        },
        {
            stock: "Apple",
            gain: "$14.3K",
            yield: "0%"
        },
        {
            stock: "Microsoft",
            gain: "13K",
            yield: "1.56%"
        },
        {
            stock: "Cisco",
            gain: "$7.4K",
            yield: "3.49%"
        },
        {
            stock: "Qualcomm",
            gain: "$7.3K",
            yield: "3.47%"
        },
    ]);
    return (
        <Card className="bg-white border-0 rounded-3 mb-4">
            <Card.Body className="p-4">
                <h3>AI Insight</h3>
                <h5>Excel</h5>
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
                                    <th scope="col" className="text-start bg-transparent">Stock</th>
                                    <th scope="col" className="text-end bg-transparent">Gain</th>
                                    <th scope="col" className="text-end bg-transparent">Yield</th>
                                </tr>
                            </thead>
                            <tbody>
                                {excelData.map((browser, index) => (
                                    <tr key={index}>
                                        <td className="text-start fw-medium">{browser.stock}</td>
                                        <td className="text-start fw-medium">{browser.gain}</td>
                                        <td className="text-end fw-medium">{browser.yield}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default AIInsightExcel;
