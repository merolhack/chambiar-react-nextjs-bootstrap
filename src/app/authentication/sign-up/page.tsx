// app/authentication/sign-up/page.tsx
"use client"

import { useRef } from 'react'

import LayoutProvider from '@/providers/LayoutProvider';

import SignUpForm from "@/components/Authentication/SignUpForm";

export default function Page() {
  const layoutRef = useRef(null);
  return (
    <LayoutProvider ref={layoutRef}>
      <SignUpForm layoutRef={layoutRef} />
    </LayoutProvider>
  );
}
