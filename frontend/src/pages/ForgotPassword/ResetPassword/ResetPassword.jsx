import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import api from "../../../utils/api";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const { token, email } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!password || !confirm) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    if (password !== confirm) {
      setError("Mật khẩu không khớp.");
      return;
    }

    try {
      // Logic đổi mật khẩu ở đây (gọi API, v.v)
      const response = await api.post(
        `/accounts/reset-password/${token}/${email}`,
        { password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Lưu tokens vào localStorage nếu backend trả về
      if (response.data.status && response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        console.log("✅ Access token saved to localStorage");
      }

      if (response.data.refreshToken) {
        localStorage.setItem("refreshToken", response.data.refreshToken);
        console.log("✅ Refresh token saved to localStorage");
      }

      alert("Đổi mật khẩu thành công! Đang đăng nhập...");

      // Redirect về home và reload để update authentication state
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error("Reset password error:", err);
      setError(
        err.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại."
      );
    }
  };

  return (
    <div className="reset-container">
      <form className="reset-form" onSubmit={handleSubmit}>
        <h2>Đổi Mật Khẩu Mới</h2>
        <label htmlFor="password">Mật khẩu mới</label>
        <input
          type="password"
          id="password"
          placeholder="Nhập mật khẩu mới"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="confirm">Nhập lại mật khẩu</label>
        <input
          type="password"
          id="confirm"
          placeholder="Nhập lại mật khẩu mới"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        {error && <div className="error-text">{error}</div>}
        <button type="submit">Đặt lại mật khẩu</button>
      </form>
    </div>
  );
}

export default ResetPassword;
