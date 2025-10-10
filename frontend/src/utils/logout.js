import api from "./api.js";

/**
 * Logout user - revoke tokens on server and clear localStorage
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    // Gọi API logout để revoke refresh tokens trên server
    await api.post("/accounts/logout", {});
    console.log("✅ Logout API successful - tokens revoked on server");
  } catch (error) {
    console.error("❌ Logout API error:", error);
    // Tiếp tục xóa tokens ngay cả khi API lỗi
  } finally {
    // Luôn xóa tokens khỏi localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    console.log("✅ Tokens cleared from localStorage");
  }
};

/**
 * Logout and redirect to login page
 * @param {Function} navigate - React Router navigate function
 */
export const logoutAndRedirect = async (navigate) => {
  await logout();
  navigate("/login");
  window.location.reload();
};

export default logout;
