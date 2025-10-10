import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "#utils/api.js";

/**
 * OAuth2 Callback Page
 * Google sẽ redirect về page này với authorization code
 * URL format: /auth/google/callback?code=xxx&state=yyy
 */
export default function GoogleOAuth2Callback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState("Authenticating with Google...");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // STEP 1: Lấy code và state từ URL
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const error = searchParams.get("error");

        // Kiểm tra nếu user từ chối
        if (error) {
          setStatus("error");
          setMessage("Authentication cancelled");
          setTimeout(() => navigate("/login"), 2000);
          return;
        }

        if (!code) {
          setStatus("error");
          setMessage("No authorization code received");
          setTimeout(() => navigate("/login"), 2000);
          return;
        }

        // STEP 2: Verify state để prevent CSRF attack
        const savedState = sessionStorage.getItem("oauth_state");
        if (state !== savedState) {
          setStatus("error");
          setMessage("Invalid state parameter. Possible CSRF attack.");
          setTimeout(() => navigate("/login"), 2000);
          return;
        }

        // STEP 3: Gửi code lên backend để exchange token
        setMessage("Verifying credentials...");

        const response = await api.post(
          "/oauth2/google/callback",
          {
            code: code,
            state: state,
          },
          {
            withCredentials: true,
          }
        );
        console.log("Callback response:", response.data);

        if (response.data.success) {
          // STEP 4: Lưu tokens
          if (response.data.token) {
            localStorage.setItem("accessToken", response.data.token);
          }
          if (response.data.refreshToken) {
            localStorage.setItem("refreshToken", response.data.refreshToken);
          }

          // Xóa state
          sessionStorage.removeItem("oauth_state");

          // STEP 5: Redirect về home
          setStatus("success");
          setMessage("Authentication successful! Redirecting...");
          setTimeout(() => navigate("/"), 1000);
        } else {
          throw new Error(response.data.message || "Authentication failed");
        }
      } catch (err) {
        console.error("Callback error:", err);
        setStatus("error");
        setMessage(
          err.response?.data?.message || err.message || "Authentication failed"
        );
        setTimeout(() => navigate("/login"), 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        {status === "processing" && (
          <>
            <div style={styles.spinner}></div>
            <h2 style={styles.title}>{message}</h2>
            <p style={styles.subtitle}>Please wait...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div style={styles.successIcon}>✓</div>
            <h2 style={styles.title}>{message}</h2>
          </>
        )}

        {status === "error" && (
          <>
            <div style={styles.errorIcon}>✕</div>
            <h2 style={styles.title}>Authentication Failed</h2>
            <p style={styles.subtitle}>{message}</p>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  box: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    maxWidth: "400px",
  },
  spinner: {
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #3498db",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "spin 1s linear infinite",
    margin: "0 auto 20px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#333",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
  },
  successIcon: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#4CAF50",
    color: "white",
    fontSize: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
  },
  errorIcon: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#f44336",
    color: "white",
    fontSize: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
  },
};
