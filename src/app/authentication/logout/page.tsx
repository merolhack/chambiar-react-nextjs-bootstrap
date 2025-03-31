"use client"

import { useRef } from 'react'
import LayoutProvider from '@/providers/LayoutProvider'
import Logout from "@/components/Authentication/Logout"

export default function Page() {
  const layoutRef = useRef(null);
  return (
    <LayoutProvider ref={layoutRef}>
      <Logout layoutRef={layoutRef} />
    </LayoutProvider>
  );
}