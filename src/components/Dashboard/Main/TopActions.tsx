// components/Dashboard/Main/TopActions.tsx
"use client";

import React from "react";
import { Card } from "react-bootstrap";

const TopActions = () => {
    return (
        <Card className="bg-white border-0 rounded-3 mb-4">
            <Card.Body className="p-4">
                <h3>Top Actions</h3>
                <p>Approve Q2 Hiring Plan</p>
                <p><strong>Due:</strong> 11 am</p>
                <p>&nbsp;<br /><br /></p>
            </Card.Body>
        </Card>
    );
}

export default TopActions;