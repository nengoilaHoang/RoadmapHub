import React from "react";
import { useState } from "react";
import "./Login.css";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCheckLogin } from "../../../hooks/userCheckLogin";
import {GoogleLogin} from '@react-oauth/google'

const Login = () => {
    const [email, setEmail] = useState("");
    const [passWord, setPassWord] = useState("");
    const [error, setError] = useState("");
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
                        // "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    withCredentials: true
                }
            );
            if (res.data?.status === true) {
                const { hashedPin, encodeToken, encodeRefreshToken } = res.data;
                // Chuyển hướng kèm param
                navigate(`/login/verify`, {
                    state: { hashedPin: hashedPin, encodeToken: encodeToken, encodeRefreshToken: encodeRefreshToken }
                });
            }
            else{
                console.log("Login failed:", res.data?.message);
                setError(res.data?.message || "Login failed");
            }
            // xử lý lưu token hoặc chuyển trang ở đây
            } catch (err) {
            console.error("Login error:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Login failed");
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
            console.log(credentialResponse);
            const response = await axios.post("http://localhost:5000/api/auth/login",{credentialResponse: credentialResponse, type: "google"})
            console.log(response)
            console.log("Google login response:", response.data);
            if(!response.data.status){
                console.log("Google login failed:", response.data?.message);
                setError(response.data?.message || "Login failed");
            }
            else{
                localStorage.setItem("token", response.data?.token);
                navigate('/');
            }
            // Xử lý đăng nhập thành công
        };
    
        const handleGoogleError = () => {
            console.log('Login Failed');
            // Xử lý đăng nhập thất bại
        };

    return (
        <div className="login-container">
        <div className="login-box">
            <h2 className="login-title">LOGIN</h2>
            <p className="login-subtitle">
            Welcome back! Let's take you to your account.
            </p>

            {/* Google button */}
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                size="large"
                text="continue_with"
                shape="rectangular"
            />

            {/* Divider */}
            <div className="divider">
            <span></span>
            <p>OR</p>
            <span></span>
            </div>
            {error && <span className="error">{error}</span>}
            {/* Form */}
            <form className="login-form" onSubmit={handleSubmit}>
            <input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e) => setPassWord(e.target.value)}/>
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
            read and agree to our <a href="/terms-of-service">Terms of Service</a> and{" "}
            <a href="/privacy-policy">Privacy Policy</a>.
            </p>
        </div>
        </div>
    );
};

export default Login;
