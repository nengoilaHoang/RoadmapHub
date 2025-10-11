import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ChangeEmailVerify.css";
import EnterPin from "#components/EnterPin/EnterPin.jsx";
import api from "../../utils/api";

export default function ChangeEmailVerify() {
  const navigate = useNavigate();
  const { hashedPin, oldEmail, newEmail } = useParams();
  const [pin, setPin] = useState(new Array(6).fill(""));
  const handleVerify = async () => {
    try {
      const res = await api.post(
        `/auth/change-email/verify/${hashedPin}/${oldEmail}/${newEmail}`,
        { pin: pin.join("") }
      );

      if (res.data?.status === true) {
        // Save new tokens to localStorage (email has changed, need new tokens)
        if (res.data.accessToken && res.data.refreshToken) {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          console.log("✅ New tokens saved after email change");
        }

        // Redirect to home
        navigate("/");
      }
    } catch (error) {
      console.error("Error verifying email change:", error);
      alert("Verification failed. Please try again.");
    }
  };

  return <EnterPin pin={pin} setPin={setPin} onClickFunction={handleVerify} />;
}
