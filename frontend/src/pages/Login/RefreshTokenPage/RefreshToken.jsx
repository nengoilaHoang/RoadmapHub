import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";

const RefreshToken = () => {
    const navigate = useNavigate();
    const handleRefresh = async () => {
        try {
            const response = await api.post("/auth/refresh-token", {
                refreshToken: localStorage.getItem("refreshToken")
            });
            //console.log("Response from refresh-token:", response.data);
            if (response.data?.newAccessToken) {
                localStorage.setItem("token", response.data.newAccessToken);
                //console.log("Token refreshed successfully", response.data.newAccessToken);
                navigate("/");
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                navigate("/login");
            }
        } catch (error) {
            //console.log(error)
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            navigate("/login");
        }
    };

    // Gọi handleRefresh (manual hoặc từ nút, effect...)
    return <button onClick={handleRefresh}>Refresh Token</button>;
};

export default RefreshToken;
