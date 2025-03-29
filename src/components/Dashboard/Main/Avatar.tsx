"use client";

import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Video from "@/components/Dashboard/Main/Video";

interface VideoData {
  src: string;
  duration: number;
  showComponents?: string[]; // Array of component names to show after this video
  delayBeforePlay?: number;
}

const Avatar = ({ onVideoEnd, onConversationStart }: {
  onVideoEnd?: (showComponents?: string[]) => void;
  onConversationStart?: () => void;
}) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [isPreloading, setIsPreloading] = useState(true);
  const [isPausing, setIsPausing] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  // Video sources with durations and components to show after each
  const videoData: VideoData[] = [
    {
      src: "/videos/klingai-demo-001.mp4",
      duration: 5,
      delayBeforePlay: 5000 // 2 second delay before this video plays
    },
    {
      src: "/videos/klingai-demo-002.mp4",
      duration: 10,
      showComponents: ['TopActionItems', 'KeyMeetingsAndSummaries', 'WorkingSchedule'],
      delayBeforePlay: 5000 // 3 second delay before this video plays
    },
    { src: "/videos/klingai-demo-003.mp4", duration: 10 },
    { src: "/videos/klingai-demo-004-1.mp4", duration: 10 },
    { src: "/videos/klingai-demo-004-2.mp4", duration: 10 },
    { src: "/videos/klingai-demo-005.mp4", duration: 5 },
    { src: "/videos/klingai-demo-006-1.mp4", duration: 10 },
    { src: "/videos/klingai-demo-006-2.mp4", duration: 10 },
  ];

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
    const currentVideo = videoData[currentVideoIndex];

    // Call parent component with components to show
    if (onVideoEnd) {
      onVideoEnd(currentVideo.showComponents);
    }

    if (currentVideoIndex < videoData.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
    } else {
      setCurrentVideoIndex(0); // Loop or handle conversation end
    }
  };

  const handleStartConversation = async () => {
    setStarted(true);
    if (onConversationStart) {
      onConversationStart();
    }
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
                Loading Avatar...
              </>
            ) : (
              "Start"
            )}
          </button>
        ) : (
          <>
            <Video
              sources={videoData.map(item => item.src)}
              currentIndex={currentVideoIndex}
              onEnd={handleVideoEnd}
              onPauseStart={() => setIsPausing(true)}
              onPauseEnd={() => setIsPausing(false)}
              delayBeforePlay={videoData[currentVideoIndex].delayBeforePlay} // Pass the delay
            />
          </>
        )}
      </div>
    </Card>
  );
};

export default Avatar;