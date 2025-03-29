"use client";

import React, { useEffect, useRef, useState } from "react";

interface VideoProps {
  sources: string[];
  onEnd?: () => void;
  currentIndex: number;
  onPauseStart?: () => void;
  onPauseEnd?: () => void;
  delayBeforePlay?: number;
  onLoadingChange?: (isLoading: boolean) => void;
}

const Video = ({ sources, onEnd, currentIndex, onPauseStart, onPauseEnd, delayBeforePlay = 0, onLoadingChange }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDelaying, setIsDelaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let delayTimeout: NodeJS.Timeout;
    let pauseTimeout: NodeJS.Timeout;

    const handleCanPlay = () => {
      setIsLoading(false);
      if (onLoadingChange) onLoadingChange(false);
      
      // Apply delay only if specified
      if (delayBeforePlay > 0) {
        setIsDelaying(true);
        delayTimeout = setTimeout(() => {
          setIsDelaying(false);
          video.play()
            .then(() => setHasError(false))
            .catch(error => {
              console.error("Playback failed:", error);
              setHasError(true);
            });
        }, delayBeforePlay);
      } else {
        video.play()
          .then(() => setHasError(false))
          .catch(error => {
            console.error("Playback failed:", error);
            setHasError(true);
          });
      }
    };

    const handleError = () => {
      setHasError(true);
      if (onLoadingChange) onLoadingChange(false);
      setIsLoading(false);
    };

    const handleEnded = () => {
      if (onPauseStart) onPauseStart();
      
      // Pause before next video or ending
      pauseTimeout = setTimeout(() => {
        if (onEnd) onEnd();
        if (onPauseEnd) onPauseEnd();
      }, 3000);
    };

    // Initialize video
    setIsLoading(true);
    setIsDelaying(false);
    if (onLoadingChange) onLoadingChange(true);
    setHasError(false);

    // Clear any existing event listeners first
    video.removeEventListener('canplay', handleCanPlay);
    video.removeEventListener('error', handleError);
    video.removeEventListener('ended', handleEnded);

    // Add new event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);

    // Set video source and load
    video.src = sources[currentIndex];
    video.load();

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
      clearTimeout(delayTimeout);
      clearTimeout(pauseTimeout);
    };
  }, [currentIndex, onEnd, onPauseStart, onPauseEnd, delayBeforePlay, onLoadingChange, sources]);

  return (
    <div className="video-container">
      {(isLoading || isDelaying) && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>{isDelaying ? "Preparing response..." : "Loading avatar..."}</p>
        </div>
      )}
      
      {hasError && (
        <div className="error-overlay">
          <p>Error loading video</p>
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
        preload="auto"
        playsInline
        className="avatar-video"
        loop={false} // Explicitly disable looping
      >
        <source src={sources[currentIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;
