// components/Dashboard/WorkEngine/AvatarWorkEngine.tsx
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Card } from "react-bootstrap";
import Video, { VideoHandle } from "@/components/Dashboard/WorkEngine/Video";

interface VideoData {
  src: string;
  duration: number;
  showComponents?: string[];
  delayBeforePlay?: number;
  message?: string;
}

interface AvatarWorkEngineProps {
  onVideoEnd?: (showComponents?: string[]) => void;
  onConversationStart?: () => void;
}

const AvatarWorkEngine = ({ onVideoEnd, onConversationStart }: AvatarWorkEngineProps) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [isPreloading, setIsPreloading] = useState(true);
  const [conversationEnded, setConversationEnded] = useState(false);
  const videoRef = useRef<VideoHandle>(null);

  const videoData: VideoData[] = [
    {
      src: "/videos/klingai-demo-silence.mp4",
      duration: 3,
      delayBeforePlay: 0, // 5 second delay
      showComponents: [],
      message: "Listening..."
    },
    {
      src: "/videos/klingai-demo-006-v2.mp4",
      duration: 10,
      delayBeforePlay: 1000,
      showComponents: []
    },
  ];

  const currentVideo = videoData[currentVideoIndex];

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

  const handleVideoEnd = useCallback(() => {
    onVideoEnd?.(currentVideo.showComponents);

    if (currentVideoIndex < videoData.length - 1) {
      // Play next video without unmounting
      const nextVideo = videoData[currentVideoIndex + 1];
      videoRef.current?.playNext(nextVideo.src);
      setCurrentVideoIndex(prev => prev + 1);
    } else {
      setConversationEnded(true);
    }
  }, [currentVideoIndex, onVideoEnd, videoData]);

  const handleStartConversation = useCallback(() => {
    // Reset video state before starting
    videoRef.current?.reset();
    
    setStarted(true);
    setConversationEnded(false);
    setCurrentVideoIndex(0);
    onConversationStart?.();
  }, [onConversationStart]);

  const handleRestartConversation = () => {
    videoRef.current?.reset();
    setCurrentVideoIndex(0);
    setConversationEnded(false);
    setStarted(false);
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
            ref={videoRef}
            source={currentVideo.src}
            onEnd={handleVideoEnd}
            delayBeforePlay={currentVideo.delayBeforePlay}
          />
        )}
      </div>
    </Card>
  );
};

export default AvatarWorkEngine;