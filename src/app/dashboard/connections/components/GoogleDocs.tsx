// src/app/dashboard/connections/components/GoogleDocs.tsx
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import 'remixicon/fonts/remixicon.css';

interface GoogleDocsProps {
    isSignedIn: boolean;
    userId: string | null;
}

export default function GoogleDocs({ isSignedIn, userId }: GoogleDocsProps) {
    const router = useRouter();
    const SERVER_URL = process.env.NEXT_PUBLIC_API_HOST;

    const signIn = () => {
        console.log('Signing in with Google...');
        console.log(`${SERVER_URL}/auth/google?userId=${userId}`);
        if (userId) {
            // Set cookie for backend authentication
            document.cookie = `userId=${userId}; path=/; SameSite=Lax; Secure`;
            window.location.href = `${SERVER_URL}/auth/google?userId=${userId}`;
        } else {
            router.push('/auth/login');
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-bold mb-4 flex items-center">
                <i className="ri-google-fill text-blue-500 mr-2 text-xl"></i>
                Google Docs
            </h2>

            {isSignedIn ? (
                <div className="text-center py-8">
                    <div className="flex justify-center mb-3">
                        <i className="ri-checkbox-circle-fill text-green-500 text-3xl"></i>
                    </div>
                    <p className="text-green-600 font-medium mb-1">
                        Successfully authenticated
                    </p>
                    <p className="text-gray-600 text-sm">
                        Your Google account is now connected to our platform
                    </p>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <p className="text-gray-600 mb-4 text-center">
                        Connect your Google account to access your documents
                    </p>
                    <button
                        onClick={signIn}
                        className="w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition flex items-center justify-center shadow-sm"
                    >
                        <i className="ri-google-fill text-blue-500 mr-2 text-xl"></i>
                        Sign in with Google
                    </button>
                </div>
            )}
        </div>
    );
}