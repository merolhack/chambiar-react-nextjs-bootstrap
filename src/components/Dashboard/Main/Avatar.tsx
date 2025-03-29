"use client";

import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Video from "@/components/Dashboard/Main/Video";

const Avatar = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [isPreloading, setIsPreloading] = useState(true);
  const [isPausing, setIsPausing] = useState(false);

  // Video sources with durations (in seconds)
  const videoData = [
    { src: "/videos/klingai-demo-001.mp4", duration: 5 },
    { src: "/videos/klingai-demo-002.mp4", duration: 10 },
    { src: "/videos/klingai-demo-003.mp4", duration: 7 },
    { src: "/videos/klingai-demo-004-1.mp4", duration: 0 },
    { src: "/videos/klingai-demo-004-2.mp4", duration: 7 },
    { src: "/videos/klingai-demo-005.mp4", duration: 7 },
    { src: "/videos/klingai-demo-006-1.mp4", duration: 0 },
    { src: "/videos/klingai-demo-006-2.mp4", duration: 0 },
  ];

  // Preload all videos when component mounts
  useEffect(() => {
    const preloadVideos = async () => {
      try {
        await Promise.all(videoData.map(item => {
          return new Promise<void>((resolve) => {
            const video = document.createElement('video');
            video.src = item.src;
            video.preload = 'auto';
            video.onloadeddata = () => resolve();
            video.onerror = () => resolve();
          });
        }));
      } finally {
        setIsPreloading(false);
      }
    };

    preloadVideos();
  }, []);

  const handleVideoEnd = () => {
    if (currentVideoIndex < videoData.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
    } else {
      setCurrentVideoIndex(0); // Loop or set to handle conversation end
    }
  };

  const handlePauseStart = () => {
    setIsPausing(true);
  };

  const handlePauseEnd = () => {
    setIsPausing(false);
  };

  const handleStartConversation = async () => {
    setStarted(true);
  };

  return (
    <Card className="border-0 rounded-3 bg-rating-color welcome-restaurant position-relative mb-4">
      <div className="d-flex align-items-center" style={{ gap: "10px" }}>
        {!started ? (
          <button 
            onClick={handleStartConversation}
            className="btn btn-primary start-button"
            disabled={isPreloading}
          >
            {isPreloading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Loading Videos...
              </>
            ) : (
              "Start Conversation"
            )}
          </button>
        ) : (
          <>
            <Video 
              sources={videoData.map(item => item.src)}
              currentIndex={currentVideoIndex}
              onEnd={handleVideoEnd}
              onPauseStart={handlePauseStart}
              onPauseEnd={handlePauseEnd}
            />
            {isPausing && (
              <div className="pause-overlay">
                <div className="pause-spinner"></div>
                <p></p>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
};

export default Avatar;