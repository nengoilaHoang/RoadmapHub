import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import AlertError from "#components/SignUp/AlertError.jsx";
import api from "#utils/api.js";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [password, setPassWord] = useState("");
  const [alertEmail, setAlertEmail] = useState(false);
  const [alertUsername, setAlertUsername] = useState(false);
  const [contentErrorEmail, setContentErrorEmail] = useState("");
  const [contentErrorUsername, setContentErrorUsername] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // OAuth2 Authorization Code Flow
  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    setError("");

    try {
      // STEP 1: Lấy Google Auth URL từ backend
      const response = await api.get("/oauth2/google/url");

      if (!response.data.success) {
        throw new Error("Failed to get authentication URL");
      }

      const { authUrl, state } = response.data;

      // Lưu state vào sessionStorage để verify sau (CSRF protection)
      sessionStorage.setItem("oauth_state", state);

      // STEP 2: Redirect user đến Google OAuth consent screen
      window.location.href = authUrl;
    } catch (err) {
      console.error("OAuth2 error:", err);
      setError(
        err.response?.data?.message ||
          "Authentication failed. Please try again."
      );
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/accounts/verify-email", {
        email: email,
        password: password,
        fullname: fullname,
      });

      if (response.data.success) {
        navigate(`/verify/${email}`, {
          state: {
            email: email,
            password: password,
            fullname: fullname,
          },
        });
      } else {
        if ("errors" in response.data) {
          if ("email" in response.data.errors) {
            setAlertEmail(true);
            setContentErrorEmail(response.data.errors.email);
          } else {
            setAlertEmail(false);
            setContentErrorEmail("");
          }
          if ("username" in response.data.errors) {
            setAlertUsername(true);
            setContentErrorUsername(response.data.errors.username);
          } else {
            setAlertUsername(false);
            setContentErrorUsername("");
          }
        }
      }
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">SIGN UP</h2>
        <p className="signup-subtitle">
          Create an account to track your progress, showcase your skill-set and
          be a part of the community.
        </p>

        {/* Google button - OAuth2 Authorization Code Flow */}
        <button
          onClick={handleGoogleSignup}
          disabled={googleLoading}
          className="google-signup-button"
          type="button"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "10px 20px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            backgroundColor: "white",
            cursor: googleLoading ? "not-allowed" : "pointer",
            width: "100%",
            fontSize: "14px",
            fontWeight: "500",
            marginBottom: "20px",
          }}
        >
          <FcGoogle size={20} />
          {googleLoading ? "Redirecting to Google..." : "Continue with Google"}
        </button>

        {error && (
          <div
            style={{
              color: "red",
              marginBottom: "10px",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        {/* Divider */}
        <div className="divider">
          <span></span>
          <p>OR</p>
          <span></span>
        </div>

        {/* Form */}
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          {alertUsername && <AlertError content={contentErrorUsername} />}

          <input
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {alertEmail && <AlertError content={contentErrorEmail} />}

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassWord(e.target.value)}
            required
          />

          <button type="submit" className="continue-btn">
            Verify Email
          </button>
        </form>

        {/* Login link */}
        <p className="login-text">
          Already have an account? <a href="/login">Login</a>
        </p>

        {/* Footer */}
        <p className="footer-text">
          By continuing to use our services, you acknowledge that you have both
          read and agree to our <a href="/terms-of-service">Terms of Service</a>{" "}
          and <a href="/privacy-policy">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
