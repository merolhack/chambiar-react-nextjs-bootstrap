"use client";

import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const LeftSidebar = ({ toogleActive }) => {
  const pathname = usePathname();

  // Enable the dark sidebar exclusively for the /dashboard/beauty-salon/ page URL.
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Only check or set the theme if we're on the beauty-salon page.
    if (pathname === "/dashboard/beauty-salon/") {
      const storedTheme = localStorage.getItem("beautySalonSidebarTheme");
      if (storedTheme) {
        setIsDark(storedTheme === "dark");
      } else {
        // Default to dark theme and persist it in localStorage
        setIsDark(true);
        localStorage.setItem("beautySalonSidebarTheme", "dark");
      }
    } else {
      // For other pages, do not use localStorage for the theme
      setIsDark(false);
    }
  }, [pathname]);

  return (
    <>
      <div className={`sidebar-area ${pathname === "/dashboard/beauty-salon/" && isDark ? "dark" : ""}`}>
        <div className="logo position-relative">
          <Link
            href="/dashboard/main/"
            className="d-block text-decoration-none position-relative"
          >
            <Image
              src="/images/chambiar-logo-wo-text.png"
              alt="logo-icon"
              width={26}
              height={26}
            />
            <span className="logo-text fw-bold text-dark">Chambiar</span>
          </Link>
          <button
            className="sidebar-burger-menu bg-transparent p-0 border-0 opacity-0 z-n1 position-absolute top-50 end-0 translate-middle-y"
            onClick={toogleActive}
          >
            <i className="material-symbols-outlined fs-24">close</i>
          </button>
        </div>

        <div className="sidebar-menu">
          <div className="menu-title small text-uppercase">
            <span className="menu-title-text">MAIN</span>
          </div>

          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <i className="material-symbols-outlined">menu</i>
                <span className="title">Menu</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      href="/dashboard/main/"
                      className={`menu-link ${pathname === "/dashboard/main/" ? "active" : ""
                        }`}
                    >
                      Main dashboard
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      href="/dashboard/personalized/"
                      className={`menu-link ${pathname === "/dashboard/personalized/" ? "active" : ""
                        }`}
                    >
                      Personalized
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      href="/dashboard/work-engine/"
                      className={`menu-link ${
                        pathname === "/dashboard/work-engine/" ? "active" : ""
                      }`}
                    >
                      Work engine
                    </Link>
                  </li>
                  {/*<li className="menu-item">
                    <Link
                      href="/dashboard/coworker/"
                      className={`menu-link ${pathname === "/dashboard/coworker/" ? "active" : ""
                        }`}
                    >
                      CoWorker
                    </Link>
                  </li>*/}
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <div className="menu-title small text-uppercase">
              <span className="menu-title-text">USER</span>
            </div>

            <div className="menu-item">
              <Link
                href="/my-profile/"
                className={`menu-link ${pathname === "/my-profile/" ? "active" : ""
                  }`}
              >
                <i className="material-symbols-outlined">account_circle</i>
                <span className="title">My Profile</span>
              </Link>
            </div>

            <Accordion.Item eventKey="27">
              <Accordion.Header>
                <i className="material-symbols-outlined">settings</i>
                <span className="title">Settings</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      href="/settings/account-settings/"
                      className={`menu-link ${pathname === "/settings/account-settings/"
                          ? "active"
                          : ""
                        }`}
                    >
                      Account Settings
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/settings/change-password/"
                      className={`menu-link ${pathname === "/settings/change-password/"
                          ? "active"
                          : ""
                        }`}
                    >
                      Change Password
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/settings/connections/"
                      className={`menu-link ${pathname === "/settings/connections/" ? "active" : ""
                        }`}
                    >
                      Connections
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/settings/privacy-policy/"
                      className={`menu-link ${pathname === "/settings/privacy-policy/" ? "active" : ""
                        }`}
                    >
                      Privacy Policy
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      href="/settings/terms-conditions/"
                      className={`menu-link ${pathname === "/settings/terms-conditions/"
                          ? "active"
                          : ""
                        }`}
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <div className="menu-item">
              <Link
                href="/authentication/logout/"
                className={`menu-link ${pathname === "/authentication/logout/" ? "active" : ""
                  }`}
              >
                <i className="material-symbols-outlined">logout</i>
                <span className="title">Logout</span>
              </Link>
            </div>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
