import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AlertError from "../../../components/SignUp/AlertError";
import AlertSuccess from "../../../components/SignUp/AlertSuccess";
import axios from "axios";
function VerifyDeletePage() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { verifyToken, email } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const deleteAccount = async () => {
            try {
                const res = await axios.post(`http://localhost:5000/api/accounts/delete-account/verify`, {
                    verifyToken,
                    email
                },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true
                    });
                console.log("Response:", res.data);
                if(res.data?.status){
                    setSuccess("Xóa tài khoản thành công");
                    setError("");
                    //fetch thêm 1 lần để check và chờ token bị xóa hoàn toàn khỏi cookie
                    const res = axios.post('http://localhost:5000/api/auth/check-login', {}, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true
                    });
                    console.log("Check login after delete:", res.data);
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
