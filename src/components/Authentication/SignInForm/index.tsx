// app/components/Authentication/SignInForm/index.tsx
"use client"; // Mark this component as a Client Component

// SignInForm component definition
import React, { useEffect, useState, MutableRefObject } from "react";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { redirect, useRouter } from 'next/navigation'; // Changed from redirect to useRouter

import Link from "next/link";
import Image from "next/image";
import { login, checkStatus } from "../../../services/auth";
import { getProfile } from "../../../services/users";
import { getInitialPrompt } from "../../../services/prompts";
import AlertDismissible from "../../AlertDismissible"

interface SignInFormProps {
  layoutRef: MutableRefObject<any>;
}

function SignInForm({ layoutRef }: SignInFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState(null);
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Add this state near your other useState hooks
  const [showPassword, setShowPassword] = useState(false);

  // Add this toggle function
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    setLoading(true);
    setError(null);

    let loginResponse = null;

    try {
      // Perform login
      loginResponse = await login(username, password);

      if (!loginResponse?.access_token) {
        throw new Error("No access token received");
      }

      console.log('loginResponse', loginResponse);
      localStorage.setItem("access_token", loginResponse.access_token);

      // Check status
      // const statusResponse = await checkStatus();
      // console.log(statusResponse);

      // Immediate redirect after successful login
      router.push('/dashboard/main');
      router.refresh(); // Ensure the page refreshes to apply auth changes

      // Use window.location for immediate, reliable redirect
      // window.location.href = '/dashboard/restaurant';

      // Fetch profile
      // const profileResponse = await getProfile();
      // setProfile(profileResponse);

      // Fetch initial prompts
      // const promptsResponse = await getInitialPrompt();
      // setPrompts(promptsResponse);
    } catch (error) {
      console.error(error);
      setError(error.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-main-content m-auto m-1230 px-3">
        <Row className="align-items-center">
          {/*<Col lg={6} className="d-none d-lg-block">
            <Image
              src="/images/login.jpg"
              className="rounded-3"
              alt="login"
              width={646}
              height={804}
            />
          </Col>*/}

          <Col lg={12}>
            <div className="mw-480 ms-lg-auto">
              <div className="d-inline-block mb-4">
                <Image
                  src="/images/chambiar-logo.svg"
                  className="rounded-3 for-light-logo"
                  alt="login"
                  width={200}
                  height={52}
                />
              </div>

              {error && <AlertDismissible
                alertHeading="Error"
                alertText={error}
              />}

              <h3 className="fs-28 mb-2">Welcome back to Chambiar!</h3>
              <p className="fw-medium fs-16 mb-4">
                Enter your details
              </p>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <label className="label text-secondary">Username</label>
                  <Form.Control
                    type="text"
                    className="h-55"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <label className="label text-secondary">Password</label>
                  <div className="password-wrapper position-relative">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      className="h-55"
                      placeholder="Type password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <i
                      style={{ color: "#A9A9C8", fontSize: "16px", right: "15px", cursor: "pointer" }}
                      className={`translate-middle-y top-50 end-0 position-absolute ${showPassword ? "ri-eye-line" : "ri-eye-off-line"}`}
                      onClick={togglePasswordVisibility}
                      aria-hidden="true"
                    ></i>
                  </div>
                </Form.Group>


                <Form.Group className="mb-4">
                  <Link href='/authentication/forgot-password/' className="fw-medium text-primary text-decoration-none">
                    Forgot Password?
                  </Link>
                </Form.Group>

                <Form.Group className="mb-4">
                  <button
                    type="submit"
                    className="btn btn-primary fw-medium py-2 px-3 w-100"
                  >
                    <div className="d-flex align-items-center justify-content-center py-1">
                      <span className="material-symbols-outlined fs-20 text-white me-2">
                        login
                      </span>
                      <span>Sign In</span>
                    </div>
                  </button>
                </Form.Group>

                <Form.Group>
                  <p>
                    Don’t have an account.{" "}
                    <Link
                      href="/authentication/sign-up/"
                      className="fw-medium text-primary text-decoration-none"
                    >
                      Sign Up
                    </Link>
                  </p>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SignInForm;
