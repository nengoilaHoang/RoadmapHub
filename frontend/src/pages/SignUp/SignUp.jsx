
import {GoogleLogin} from '@react-oauth/google'
import {jwtDecode} from "jwt-decode"
import { useState } from 'react';
import api from '#utils/api.js'
export default function SignUp() {

    const [email,setEmail] = useState("");
    const [fullName,setFullName] = useState("");
    const [password,setPassWord] = useState("")
    // const navigate = useNav
    // const clientSecret = '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'
    const handleGoogleSuccess = (credentialResponse) => {
        console.log(credentialResponse);
        console.log(jwtDecode(credentialResponse.credential));
        // Xử lý đăng nhập thành công
    };

    const handleGoogleError = () => {
        console.log('Login Failed');
        // Xử lý đăng nhập thất bại
    };
    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log(email,password,fullName)
        axios.post("/accounts/login",{email:email,password:password,fullName:fullName})
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            <h1 className="fs-1 fw-bold">Sign Up</h1>
            <p className="fs-3 ">Create an account to track your progress, showcase your skill-set and be a part of the community.</p>
            
            <form className="d-flex flex-column" onSubmit={handleSubmit}>
               
                <div className='mb-4'>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        theme="outline"
                        size="large"
                        text="continue_with"
                        shape="rectangular"
                    />

                </div>
                 <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="flex-grow-1 border-bottom"></div>
                    <span className="text-secondary fw-semibold">OR</span>
                    <div className="flex-grow-1 border-bottom"></div>
                </div>

                <div class="mb-3">
                    <label for="fullName" class="form-label fs-4 fw-bold">Full Name</label>
                    <input type="text" onChange={(e)=>setFullName(e.target.value)} class="form-control form-control-lg" id="fullName" placeholder="full name" required/>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label fs-4 fw-bold">Email address</label>
                    <input type="email" onChange={(e)=>setEmail(e.target.value)} class="form-control form-control-lg" id="email" placeholder="email" required/>
                </div>
                <div class="mb-3 ">
                    <label for="password" class="form-label fs-4 fw-bold">Password</label>
                    <input type="password" onChange={(e)=>setPassWord(e.target.value)} class="form-control form-control-lg" id="password" placeholder="password" required />
                </div>
                <button type="submit" className="btn btn-dark fs-4 fw-bold">Verify Email</button>
                <div className="mt-3">Already have an account? <a href='/login' className="fw-bold text-decoration-none">Login</a></div>
                <p>By continuing to use our services, you acknowledge that you have both read and agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</p>
            </form>
        </div>
    )
}