// components/Dashboard/Main/TopMeetings.tsx
"use client";

import React from "react";
import { Card } from "react-bootstrap";

const TopMeetings = () => {
    return (
        <Card className="bg-white border-0 rounded-3 mb-4">
            <Card.Body className="p-1">
                <h3>Top Meetings</h3>
                <p>
                    <strong>Subject:</strong> Very Important<br />
                    <strong>Time:</strong> 11:30 am
                </p>
            </Card.Body>
        </Card>
    );
}

export default TopMeetings;
