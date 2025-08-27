import React, { useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./ChangeEmailVerify.css";
import axios from "axios";
import EnterPin from "#components/EnterPin/EnterPin.jsx";

export default function ChangeEmailVerify() {
    // Lấy các tham số từ URL
    const location = useLocation();
    const navigate = useNavigate();
    const { hashedPin, oldEmail, newEmail } = useParams();
    const [pin, setPin] = useState(new Array(6).fill(""));
    const handleVerify = async () => {
        const res = await axios.post(`http://localhost:5000/api/auth/change-email/verify/${hashedPin}/${oldEmail}/${newEmail}`,
            {hashedPin, pin: pin.join("")}, // body
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (res.data?.status === true) {
            navigate("/");
            }
    };

    return (
        <EnterPin pin={pin} setPin={setPin} onClickFunction={handleVerify}/>
    );
}
