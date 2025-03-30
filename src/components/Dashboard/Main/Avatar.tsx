"use client";

import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Video from "@/components/Dashboard/Main/Video";

interface VideoData {
  src: string;
  duration: number;
  showComponents?: string[];
  delayBeforePlay?: number;
  message?: string; // Optional message to display during delay
}

const Avatar = ({ onVideoEnd, onConversationStart }: {
  onVideoEnd?: (showComponents?: string[]) => void;
  onConversationStart?: () => void;
}) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [isPreloading, setIsPreloading] = useState(true);
  const [conversationEnded, setConversationEnded] = useState(false);

  // Video sources with durations, delays, and components to show
  const videoData: VideoData[] = [
    {
      src: "/videos/klingai-demo-001-v2.mp4",
      duration: 5,
      delayBeforePlay: 5000, // 5 second delay
      message: "Preparing response..."
    },
    { 
      src: "/videos/klingai-demo-002.mp4", 
      duration: 10,
      delayBeforePlay: 3000, // 3 second delay
      showComponents: ['TopActionItems', 'KeyMeetingsAndSummaries', 'WorkingSchedule'],
      message: "Analyzing your request..."
    },
    {
      src: "/videos/klingai-demo-003-v2.mp4",
      duration: 8,
      delayBeforePlay: 2000, // 2 second delay
      message: "Compiling information..."
    },
    { src: "/videos/klingai-demo-004-1.mp4", duration: 10 },
    { src: "/videos/klingai-demo-004-2.mp4", duration: 10 },
    { src: "/videos/klingai-demo-005.mp4", duration: 5 },
    { src: "/videos/klingai-demo-006-1.mp4", duration: 10 },
    { src: "/videos/klingai-demo-006-2.mp4", duration: 10 },
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
    const currentVideo = videoData[currentVideoIndex];
    
    // Show components associated with this video
    if (onVideoEnd) {
      onVideoEnd(currentVideo.showComponents);
    }

    // Move to next video or end conversation
    if (currentVideoIndex < videoData.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
    } else {
      setConversationEnded(true);
    }
  };

  const handleStartConversation = () => {
    setStarted(true);
    setConversationEnded(false);
    setCurrentVideoIndex(0);
    if (onConversationStart) {
      onConversationStart();
    }
  };

  const handleRestartConversation = () => {
    setCurrentVideoIndex(0);
    setConversationEnded(false);
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
        ) : conversationEnded ? (
          <div className="conversation-ended">
            <p>Conversation completed</p>
            <button 
              onClick={handleRestartConversation}
              className="btn btn-secondary mt-2"
            >
              Restart Conversation
            </button>
          </div>
        ) : (
          <Video
            sources={videoData.map(item => item.src)}
            currentIndex={currentVideoIndex}
            onEnd={handleVideoEnd}
            delayBeforePlay={videoData[currentVideoIndex].delayBeforePlay}
          />
        )}
      </div>
    </Card>
  );
};

export default Avatar;
