import React from "react";
import { useState } from "react";
import "./Login.css";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCheckLogin } from "../../../hooks/userCheckLogin";

const Login = () => {
    const [email, setEmail] = useState("");
    const [passWord, setPassWord] = useState("");
    const navigate = useNavigate();
    const { isLoggedIn } = useCheckLogin();

    if (isLoggedIn) {
        navigate("/");
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // chặn reload trang mặc định
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login",
                { email, passWord ,type: "normal"}, // body
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            if (res.data?.status === true) {
                const { hashedPin, encodeToken, encodeRefreshToken } = res.data;
                // Chuyển hướng kèm param
                navigate(`/login/verify`, {
                    state: { hashedPin: hashedPin, encodeToken: encodeToken, encodeRefreshToken: encodeRefreshToken }
                });
            }
            // xử lý lưu token hoặc chuyển trang ở đây
            } catch (err) {
            console.error("Login error:", err.response?.data || err.message);
        }
    };

    return (
        <div className="login-container">
        <div className="login-box">
            <h2 className="login-title">LOGIN</h2>
            <p className="login-subtitle">
            Welcome back! Let's take you to your account.
            </p>

            {/* Google button */}
            <button className="google-btn">
            <FcGoogle className="google-icon" />
            Continue with Google
            </button>

            {/* Divider */}
            <div className="divider">
            <span></span>
            <p>OR</p>
            <span></span>
            </div>

            {/* Form */}
            <form className="login-form" onSubmit={handleSubmit}>
            <input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e) => setPassWord(e.target.value)}/>
            <a href="#" className="reset-link">
                Reset your password
            </a>
            <button type="submit" className="continue-btn">
                Continue
            </button>
            </form>

            {/* Signup link */}
            <p className="signup-text">
            Don’t have an account? <a href="#">Sign up</a>
            </p>

            {/* Footer */}
            <p className="footer-text">
            By continuing to use our services, you acknowledge that you have both
            read and agree to our <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>.
            </p>
        </div>
        </div>
    );
};

export default Login;
