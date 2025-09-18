import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import AlertError from '#components/SignUp/AlertError.jsx';
import { jwtDecode } from "jwt-decode";
import api from '#utils/api.js';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [fullname, setFullName] = useState("");
    const [password, setPassWord] = useState("");
    const [alertEmail, setAlertEmail] = useState(false);
    const [alertUsername, setAlertUsername] = useState(false);
    const [contentErrorEmail, setContentErrorEmail] = useState("");
    const [contentErrorUsername, setContentErrorUsername] = useState("");
    const navigate = useNavigate();

    const handleGoogleSuccess = async (credentialResponse) => {
        console.log(credentialResponse);
        console.log(jwtDecode(credentialResponse.credential));
        
        const response = await api.post("/accounts/signup-google", 
            { credential: credentialResponse.credential },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            }
        );
        
        console.log(response);
        if (!response.data.success) {
            navigate('/login');
        } else {
            navigate('/');
        }
    };

    const handleGoogleError = () => {
        console.log('Login Failed');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await api.post("/accounts/verify-email", {
                email: email,
                password: password,
                fullname: fullname
            });
            
            if (response.data.success) {
                navigate(`/verify/${email}`, {
                    state: {
                        email: email,
                        password: password,
                        fullname: fullname
                    }
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
            console.log(err);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2 className="signup-title">SIGN UP</h2>
                <p className="signup-subtitle">
                    Create an account to track your progress, showcase your skill-set and be a part of the community.
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
                    read and agree to our <a href="/terms-of-service">Terms of Service</a> and{" "}
                    <a href="/privacy-policy">Privacy Policy</a>.
                </p>
            </div>
        </div>
    );
}
