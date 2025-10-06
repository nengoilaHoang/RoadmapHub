import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AlertError from "#components/SignUp/AlertError.jsx";
import AlertSuccess from "#components/SignUp/AlertSuccess.jsx";
import axios from "axios";
import api from "../../../utils/api";
function VerifyDeletePage() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { verifyToken, email } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const deleteAccount = async () => {
            try {
                const res = await api.post(`/accounts/delete-account/verify`, {
                    verifyToken,
                    email
                },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true
                    });
                //console.log("Response:", res.data);
                if(res.data?.status){
                    setSuccess("Xóa tài khoản thành công");
                    setError("");
                    setTimeout(() => {
                        navigate('/login');
                        window.location.reload();
                    }, 2000);
                }
                else{
                    setError("thao tác không thành công");
                    setSuccess("");
                }
            } catch (error) {
                setError("thao tác không thành công: " + error.message);
                setSuccess("");
            }
        };
        deleteAccount();
    }, []);
    return (
        <div>
            {error && <AlertError content={error} />}
            {success && <AlertSuccess content={success} />}
        </div>
    );
}

export default VerifyDeletePage;
