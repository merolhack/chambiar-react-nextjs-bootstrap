"use client";

import React from "react";
import { Card } from "react-bootstrap";
import Image from "next/image";

const HubspotScreenshot = () => {
    return (
        <Card className="bg-white border-0 rounded-3 mb-4">
            <Card.Body className="p-4">
                <Image
                    src="/images/demo/Hubspot-screenshot.png"
                    alt="Hubspot Screenshot"
                    width={400}
                    height={300}
                />
            </Card.Body>
        </Card>
    );
}

export default HubspotScreenshot;
