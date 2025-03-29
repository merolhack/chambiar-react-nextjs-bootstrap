"use client";

import React, { useEffect, useRef, useState } from "react";

interface VideoProps {
  sources: string[];
  onEnd?: () => void;
  currentIndex: number;
  onPauseStart?: () => void;
  onPauseEnd?: () => void;
}

const Video = ({ sources, onEnd, currentIndex, onPauseStart, onPauseEnd }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let playAttempt: NodeJS.Timeout;
    let pauseTimeout: NodeJS.Timeout;

    const handleCanPlay = () => {
      setIsLoading(false);
      video.play()
        .then(() => {
          setHasError(false);
        })
        .catch(error => {
          console.error("Playback failed:", error);
          setHasError(true);
        });
    };

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
    };

    const handleEnded = () => {
      if (onPauseStart) onPauseStart();
      
      // Start pause timer (3 seconds)
      pauseTimeout = setTimeout(() => {
        if (onEnd) onEnd();
        if (onPauseEnd) onPauseEnd();
      }, 3000);
    };

    setIsLoading(true);
    setHasError(false);

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);

    video.load();

    playAttempt = setTimeout(() => {
      if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
        video.play().catch(console.error);
      }
    }, 500);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
      clearTimeout(playAttempt);
      clearTimeout(pauseTimeout);
    };
  }, [currentIndex, onEnd, onPauseStart, onPauseEnd]);

  return (
    <div className="video-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Loading video...</p>
        </div>
      )}
      
      {hasError && (
        <div className="error-overlay">
          <p>Failed to load video</p>
          <button onClick={() => {
            setHasError(false);
            setIsLoading(true);
            videoRef.current?.load();
          }}>Retry</button>
        </div>
      )}

      <video
        ref={videoRef}
        width="320"
        height="260"
        muted
        preload="auto"
        playsInline
        className="avatar-video"
      >
        <source src={sources[currentIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;