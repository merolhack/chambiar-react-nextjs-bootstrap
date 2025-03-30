// components/Dashboard/Main/TopEmails.tsx
"use client";

import React from "react";
import { Card } from "react-bootstrap";

const TopEmails = () => {
    return (
        <Card className="bg-white border-0 rounded-3 mb-4">
            <Card.Body className="p-4">
                <h3>Top Emails</h3>
                <p><strong>Sender:</strong> Christopher Smith</p>
                <p><strong>Time:</strong> Proposal Review</p>
                <p><strong>Sent:</strong> 7:46 am</p>
            </Card.Body>
        </Card>
    );
}

export default TopEmails;