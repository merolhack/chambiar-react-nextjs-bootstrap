"use client";

import React from "react";
import { Card } from "react-bootstrap";
import Video from "@/components/Dashboard/Main/Video";

const Avatar = () => {
  return (
    <>
      <Card className="border-0 rounded-3 bg-rating-color welcome-restaurant position-relative mb-4">
        <div className="d-flex align-items-center" style={{ gap: "10px" }}>
          <Video />
        </div>
      </Card>
    </>
  );
};

export default Avatar;
