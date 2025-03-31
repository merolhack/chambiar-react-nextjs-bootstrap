// app/authentication/sign-in/page.tsx
"use client"

import { useRef } from 'react'
import LayoutProvider from '@/providers/LayoutProvider'
import SignInForm from "@/components/Authentication/SignInForm"

export default function Page() {
  const layoutRef = useRef(null);
  return (
    <LayoutProvider ref={layoutRef}>
      <SignInForm layoutRef={layoutRef} />
    </LayoutProvider>
  );
}