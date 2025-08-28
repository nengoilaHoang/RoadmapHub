import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LoginVerify.css";
import axios from "axios";
import EnterPin from "../../../components/EnterPin/EnterPin";
import AlertError from "#components/SignUp/AlertError.jsx";

export default function LoginVerify() {
  // Lấy các tham số từ URL
  const location = useLocation();
  const navigate = useNavigate();
  const { hashedPin, encodeToken } = location.state;
  //
  const [pin, setPin] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");

  useEffect(() => {

    }, [error]);

  const handleVerify = async () => {
    try{
      const res = await axios.post("http://localhost:5000/api/auth/login/verify",
        { hashedPin, encodeToken, pin: pin.join("")}, // body
        {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        console.log(res.data);
        if (res.data?.status === true) {
          navigate("/");
        } else {
          setError("Xác thực không thành công");
        }
    }
    catch(err){
      console.error("Verify error:", err.response?.data || err.message);
      setError("Xác thực không thành công");
    }
  };

  return (
    <div>
      <EnterPin pin={pin} setPin={setPin} onClickFunction={handleVerify}/>
      {error && <AlertError content={error} />}
    </div>
  );
}
