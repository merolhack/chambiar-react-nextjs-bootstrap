// src/app/dashboard/coworker/LiveKitVideoCall.tsx
'use client';

import { useEffect, useState } from 'react';
import {
  LiveKitRoom,
  ControlBar,
  FocusLayout,
  RoomAudioRenderer,
} from '@livekit/components-react';
import type { ControlBarControls } from '@livekit/components-react';
import '@livekit/components-styles';

interface LiveKitVideoCallProps {
  roomName: string;
  participantName: string;
  serverUrl: string;
  onCallEnd?: () => void;
}

export default function LiveKitVideoCall({
  roomName,
  participantName,
  serverUrl,
  onCallEnd,
}: LiveKitVideoCallProps) {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const fetchToken = async () => {
      setError(null);
      try {
        const resp = await fetch(
          `/api/livekit-token?room=${encodeURIComponent(roomName)}&participant=${encodeURIComponent(participantName)}`
        );
        if (!resp.ok) {
          const errorData = await resp.json();
          throw new Error(errorData.error || `Failed to fetch token: ${resp.statusText}`);
        }
        const data = await resp.json();
        if (active) {
          setToken(data.token);
        }
      } catch (e: any) {
        console.error('Error fetching LiveKit token:', e);
        if (active) {
          setError(e.message || 'An unknown error occurred while fetching the token.');
          setToken(undefined);
        }
      }
    };

    fetchToken();

    return () => {
      active = false;
    };
  }, [roomName, participantName]);

  if (error) {
    return <div style={{ padding: '1rem', color: 'red' }}>Error: {error} Please try again later.</div>;
  }

  if (!token) {
    return <div style={{ padding: '1rem' }}>Loading video session...</div>;
  }

  // Define which controls to show/hide for the ControlBar
  const customControls: ControlBarControls = {
    microphone: true,      // Keep microphone button visible
    camera: false,         // Hide camera button
    chat: false,           // Hide chat button
    screenShare: false,    // Hide screen share button
    leave: false,          // Hide leave button
    // Add other controls like 'settings: true' or 'participants: true' if you want them visible
  };

  return (
    // It's good practice to add data-lk-theme for styling context from @livekit/components-styles
    <div style={{ height: 'calc(100vh - 150px)', width: '100%' }} data-lk-theme="default">
      <LiveKitRoom
        token={token}
        serverUrl={serverUrl}
        connect={true} // Automatically connect to the room
        audio={true}   // Request audio permissions and connect with audio enabled
        video={false}   // Request video permissions and connect with video enabled
        onDisconnected={() => {
          console.log('Disconnected from LiveKit room');
          if (onCallEnd) {
            onCallEnd();
          }
        }}
      >
        {/* RoomAudioRenderer is essential for hearing other participants */}
        <RoomAudioRenderer />

        {/* Custom layout structure */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Control bar at the bottom */}
          <ControlBar controls={customControls} />
        </div>
      </LiveKitRoom>
    </div>
  );
}