"use client";

import React from "react";
import { Card } from "react-bootstrap";

const Video = () => {
    return (
      <>
        <Card className="">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <video width="320" height="180" autoPlay muted loop preload="auto">
                <source src="/videos/chambiar-avatar-001.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
          </div>
        </Card>
      </>
    );
  };
  
  export default Video;