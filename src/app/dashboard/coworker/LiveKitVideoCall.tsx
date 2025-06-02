// src/app/dashboard/coworker/LiveKitVideoCall.tsx
'use client';

import { useEffect, useState } from 'react';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import '@livekit/components-styles'; // Default LiveKit styles
// import '@livekit/components-styles/prefabs'; // Or prefab styles for more opinionated defaults

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
      setError(null); // Reset error on new attempt
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

  return (
    <div style={{ height: 'calc(100vh - 150px)', width: '100%' }}> {/* Example Styling: Adjust as needed */}
      <LiveKitRoom
        token={token}
        serverUrl={serverUrl}
        connect={true}
        // audio={true} // Set default states if needed
        // video={true}
        onDisconnected={() => {
          console.log('Disconnected from LiveKit room');
          if (onCallEnd) {
            onCallEnd();
          }
        }}
      >
        {/* VideoConference provides a full-featured, prebuilt UI */}
        <VideoConference />
        {/* Alternatively, you can build a custom UI using individual components:
          <ParticipantsView />
          <ControlBar controls={{ microphone: true, camera: true, screenShare: true, chat: true, leave: true }} />
        */}
      </LiveKitRoom>
    </div>
  );
}