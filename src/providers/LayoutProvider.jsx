// providers/LayoutProvider.jsx
"use client";

import React, { useState, useRef, forwardRef } from "react";
import { usePathname } from "next/navigation";
import LeftSidebar from "@/components/Layout/LeftSidebar";
import TopNavbar from "@/components/Layout/TopNavbar";
import Footer from "@/components/Layout/Footer";
import ControlPanel from "@/components/Layout/ControlPanel";

const LayoutProvider = forwardRef(({ children }, ref) => {
  const [active, setActive] = useState(false);
  const pathname = usePathname();

  // Add a ref to the main content div
  const mainContentRef = useRef(null);

  const toogleActive = () => {
    setActive(!active);
  };
  return (
    <>
      <div className={`main-wrapper-content ${active && "active"}`}>
        {!(
          pathname === "/authentication/sign-in/" ||
          pathname === "/authentication/sign-up/" ||
          pathname === "/authentication/forgot-password/" ||
          pathname === "/authentication/reset-password/" ||
          pathname === "/authentication/lock-screen/" ||
          pathname === "/authentication/confirm-email/" ||
          pathname === "/authentication/logout/" ||

          pathname === "/" ||
          pathname === "/front-pages/features/" ||
          pathname === "/front-pages/team/" ||
          pathname === "/front-pages/faq/" ||
          pathname === "/front-pages/contact/"
        ) && (
            <>
              <LeftSidebar toogleActive={toogleActive} />
            </>
          )}

        <div
          className="main-content d-flex flex-column"
          ref={ref}
          style={{ 
            overflowY: 'auto',
            height: '100vh',
            paddingLeft: '300px',
            transition: 'all 0.5s',
            paddingRight: '25px'
          }}
        >
          {!(
            pathname === "/authentication/sign-in/" ||
            pathname === "/authentication/sign-up/" ||
            pathname === "/authentication/forgot-password/" ||
            pathname === "/authentication/reset-password/" ||
            pathname === "/authentication/lock-screen/" ||
            pathname === "/authentication/confirm-email/" ||
            pathname === "/authentication/logout/" ||

            pathname === "/" ||
            pathname === "/front-pages/features/" ||
            pathname === "/front-pages/team/" ||
            pathname === "/front-pages/faq/" ||
            pathname === "/front-pages/contact/"
          ) && (
              <>
                <TopNavbar toogleActive={toogleActive} />
              </>
            )}

          {children}

          {!(
            pathname === "/authentication/sign-in/" ||
            pathname === "/authentication/sign-up/" ||
            pathname === "/authentication/forgot-password/" ||
            pathname === "/authentication/reset-password/" ||
            pathname === "/authentication/lock-screen/" ||
            pathname === "/authentication/confirm-email/" ||
            pathname === "/authentication/logout/" ||

            pathname === "/" ||
            pathname === "/front-pages/features/" ||
            pathname === "/front-pages/team/" ||
            pathname === "/front-pages/faq/" ||
            pathname === "/front-pages/contact/"
          ) && <Footer />}
        </div>
      </div>

      <div className="main-content d-flex flex-column" ref={mainContentRef} style={{ overflowY: 'auto', height: '100vh' }}>
        <ControlPanel />
      </div>
    </>
  );
});

LayoutProvider.displayName = "LayoutProvider";
export default LayoutProvider;
