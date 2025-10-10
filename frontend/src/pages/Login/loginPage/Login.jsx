import React from "react";
import { useState } from "react";
import "./Login.css";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useCheckLogin } from "../../../hooks/userCheckLogin";
import AlertError from "#components/SignUp/AlertError.jsx";
import api from "../../../utils/api";
const Login = () => {
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useCheckLogin();

  if (isLoggedIn) {
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // chặn reload trang mặc định
    try {
      const res = await api.post(
        "/auth/login",
        { email, passWord, type: "normal" }, // body
        {
          headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          withCredentials: true,
        }
      );
      if (res.data?.status === true) {
        const { hashedPin, encodeToken, encodeRefreshToken } = res.data;
        // Chuyển hướng kèm param
        navigate(`/login/verify`, {
          state: {
            hashedPin: hashedPin,
            encodeToken: encodeToken,
            encodeRefreshToken: encodeRefreshToken,
          },
        });
      } else {
        //console.log("Login failed:", res.data?.message);
        setError(res.data?.message || "Login failed");
      }
      // xử lý lưu token hoặc chuyển trang ở đây
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  // OAuth2 Authorization Code Flow
  const handleGoogleLogin = async () => {
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

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">LOGIN</h2>
        <p className="login-subtitle">
          Welcome back! Let's take you to your account.
        </p>

        {/* Google button - OAuth2 Authorization Code Flow */}
        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="google-login-button"
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

        {/* Divider */}
        <div className="divider">
          <span></span>
          <p>OR</p>
          <span></span>
        </div>
        {error && <AlertError content={error} />}
        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassWord(e.target.value)}
          />
          <a href="/forgot-password" className="reset-link">
            forgot your password
          </a>
          <button type="submit" className="continue-btn">
            Continue
          </button>
        </form>

        {/* Signup link */}
        <p className="signup-text">
          Don’t have an account? <a href="/signup">Sign up</a>
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
};

export default Login;
