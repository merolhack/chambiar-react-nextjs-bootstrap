// components/Dashboard/WorkEngine/Video.tsx
"use client";

import React, { 
  useEffect, 
  useRef, 
  useState, 
  memo, 
  forwardRef, 
  useImperativeHandle,
  useCallback
} from "react";

interface VideoProps {
  source: string;
  onEnd?: () => void;
  delayBeforePlay?: number;
}

export type VideoHandle = {
  reset: () => void;
  playNext: (src: string) => void;
};

const Video = memo(forwardRef<VideoHandle, VideoProps>(
  ({ source, onEnd, delayBeforePlay = 0 }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isDelaying, setIsDelaying] = useState(false);
    const delayTimeout = useRef<NodeJS.Timeout>();
    const onEndRef = useRef(onEnd);
    onEndRef.current = onEnd;

    // Reset handler
    const handleReset = useCallback(() => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        videoRef.current.removeAttribute('src');
        setIsLoading(true);
        setHasError(false);
        setIsDelaying(false);
      }
    }, []);

    // Play next video handler
    const playNext = useCallback((src: string) => {
      if (videoRef.current) {
        videoRef.current.src = src;
        videoRef.current.load();
        setIsLoading(true);
        setHasError(false);
      }
    }, []);

    useImperativeHandle(ref, () => ({
      reset: handleReset,
      playNext,
    }));

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handleCanPlay = () => {
        setIsLoading(false);

        if (delayBeforePlay > 0) {
          setIsDelaying(true);
          delayTimeout.current = setTimeout(() => {
            setIsDelaying(false);
            video.play().catch(() => setHasError(true));
          }, delayBeforePlay);
        } else {
          video.play().catch(() => setHasError(true));
        }
      };

      const handleEnded = () => {
        onEndRef.current?.();
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('ended', handleEnded);

      return () => {
        clearTimeout(delayTimeout.current);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('ended', handleEnded);
      };
    }, [delayBeforePlay]);

    useEffect(() => {
      const video = videoRef.current;
      if (!video || video.src === source) return;

      video.src = source;
      video.load();
    }, [source]);

    return (
      <div className="video-container">
        {(isLoading || isDelaying) && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>{isDelaying ? "Listening..." : "Loading avatar..."}</p>
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
          width="480"
          height="260"
          preload="auto"
          playsInline
          className="avatar-video"
          loop={false}
        >
          <source src={source} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
));

Video.displayName = "Video";
export default Video;