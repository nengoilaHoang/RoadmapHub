import React, { useState } from "react";
import axios from "axios";
import "./forgotPassword.css";
import api from "../../../utils/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      // Simulate sending a reset link
      await api.post(
        "/auth/forgot-password",
        { email }, // body
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    } catch (err) {
      console.error("Error sending reset link:", err);
      setError("Failed to send reset link. Please try again later.");
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-left">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6195/6195696.png"
          alt="Forgot Password"
        />
      </div>

      <div className="forgot-right">
        <h2>Forgot password</h2>
        <p>Enter your email and we'll send you a link to reset your password</p>

        <form onSubmit={handleSubmit} className="forgot-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <span className="error">{error}</span>}
          <button type="submit">SUBMIT</button>
        </form>

        <a href="/login" className="back-link">
          &lt; back to login
        </a>
      </div>
    </div>
  );
}

export default ForgotPassword;
