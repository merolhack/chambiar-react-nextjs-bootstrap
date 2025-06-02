// src/app/api/livekit-token/route.ts
import { AccessToken } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const roomName = searchParams.get('room');
    const participantName = searchParams.get('participant');

    if (!roomName || !participantName) {
        return NextResponse.json(
            { error: 'Missing room or participant name' },
            { status: 400 }
        );
    }

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
        return NextResponse.json(
            { error: 'LiveKit server API key or secret not set. Please check environment variables.' },
            { status: 500 }
        );
    }

    try {
        const at = new AccessToken(apiKey, apiSecret, {
            identity: participantName,
            // ttl: '10m', // Optional: Set a time-to-live for the token, e.g., 10 minutes
        });

        at.addGrant({
            room: roomName,
            roomJoin: true,
            canPublish: true,
            canSubscribe: true,
            // canPublishData: true, // Optional: If data channels are needed
            // hidden: false, // Optional: If participant should be hidden
        });

        const token = await at.toJwt();
        return NextResponse.json({ token });

    } catch (error) {
        console.error("Error generating LiveKit token:", error);
        return NextResponse.json(
            { error: 'Failed to generate LiveKit token.' },
            { status: 500 }
        );
    }
}