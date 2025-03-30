// components/Dashboard/Main/HubspotExcel.tsx
"use client";

import React from "react";
import { Card } from "react-bootstrap";
import Image from "next/image";

const NotionScreenshot = () => {
    return (
        <Card style={{ width: '100%', maxWidth: '900px', position: 'relative', aspectRatio: '16/9' }} className="bg-white border-0 rounded-3 mb-4">
            <Card.Body className="p-4">
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Image
                        src="/images/demo/Notion-screenshot.jpg"
                        alt="Notion Screenshot"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            </Card.Body>
        </Card>
    );
}

export default NotionScreenshot;
