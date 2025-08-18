import mail from '#publics/mail.png'
import { useState } from 'react';
import { useLocation,useParams } from 'react-router-dom';
import api from '#utils/api.js'
export default function VerifyEmail(){
    const {email} = useParams();
    const {state} = useLocation();
    const {fullname,password} = state;
    const [resent,setResent] = useState(false)
    const resentEmail = (
        <>
         <span className='text-success'>Verification email has been sent!</span>
        </>
    )
    const handleResentEmail = ()=>{
        setResent(true);
        console.log(email,password,fullname)
        api.post("/accounts/verify-email",{email:email,password:password,fullname:fullname})
    }
    return(
    <>
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        <img src={mail} height={200} width={200} className='mt-2 mb-3'/>
        <h1>
            Verify your email address
        </h1>
        <p>We have sent you an email at <b>{email}.</b> Please click the link to verify your account. This link will expire shortly, so please verify soon!</p>
        {
            !resent?(
                <p>Please make sure to check your spam folder. If you still don't have the email click to <span className='text-primary cursor-pointer' onClick={handleResentEmail}>resend verification email.</span></p>
            ):resentEmail
        }
        
    </div>

    </>)
}