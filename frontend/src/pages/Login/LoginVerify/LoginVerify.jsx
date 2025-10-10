import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LoginVerify.css";
import EnterPin from "../../../components/EnterPin/EnterPin";
import AlertError from "#components/SignUp/AlertError.jsx";
import api from "../../../utils/api";

export default function LoginVerify() {
  // Lấy các tham số từ URL
  const location = useLocation();
  const navigate = useNavigate();
  const { hashedPin, encodeToken, encodeRefreshToken } = location.state;
  //
  const [pin, setPin] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");

  useEffect(() => {}, [error]);

  const handleVerify = async () => {
    try {
      const res = await api.post(
        "/auth/login/verify",
        { hashedPin, encodeToken, encodeRefreshToken, pin: pin.join("") }, // body
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      //console.log(res.data);
      if (res.data?.status === true) {
        // Lưu tokens vào localStorage
        if (res.data.accessToken) {
          localStorage.setItem("accessToken", res.data.accessToken);
        }
        if (res.data.refreshToken) {
          localStorage.setItem("refreshToken", res.data.refreshToken);
        }
        navigate("/");
      } else {
        setError("Xác thực không thành công");
      }
    } catch (err) {
      console.error("Verify error:", err.response?.data || err.message);
      setError("Xác thực không thành công");
    }
  };

  return (
    <div>
      <EnterPin pin={pin} setPin={setPin} onClickFunction={handleVerify} />
      {error && <AlertError content={error} />}
    </div>
  );
}
