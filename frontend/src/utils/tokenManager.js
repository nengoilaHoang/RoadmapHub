/**
 * Token Management Utilities
 * Các hàm helper để quản lý access token và refresh token
 */

// Lưu tokens vào localStorage
export const saveTokens = (accessToken, refreshToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }
  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }
};

// Lấy access token
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

// Lấy refresh token
export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

// Xóa tất cả tokens
export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// Kiểm tra xem có access token không
export const hasAccessToken = () => {
  return !!localStorage.getItem("accessToken");
};

// Kiểm tra xem có refresh token không
export const hasRefreshToken = () => {
  return !!localStorage.getItem("refreshToken");
};

// Parse JWT token để lấy payload (không verify, chỉ decode)
export const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error parsing JWT:", error);
    return null;
  }
};

// Kiểm tra xem token có hết hạn chưa
export const isTokenExpired = (token) => {
  try {
    const payload = parseJwt(token);
    if (!payload || !payload.exp) {
      return true;
    }

    // exp là timestamp tính bằng giây
    const expirationTime = payload.exp * 1000; // Chuyển sang milliseconds
    const currentTime = Date.now();

    // Thêm buffer 5 phút (300000 ms) để refresh trước khi thực sự hết hạn
    return currentTime >= expirationTime - 300000;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
};

// Lấy thông tin user từ token
export const getUserFromToken = (token) => {
  try {
    const payload = parseJwt(token);
    if (!payload) {
      return null;
    }

    return {
      id: payload.id,
      userName: payload.userName,
      email: payload.email,
    };
  } catch (error) {
    console.error("Error getting user from token:", error);
    return null;
  }
};

// Kiểm tra authentication status
export const isAuthenticated = () => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    return false;
  }

  // Kiểm tra xem token có hết hạn chưa
  if (isTokenExpired(accessToken)) {
    // Nếu hết hạn nhưng có refresh token thì vẫn coi như authenticated
    // Axios interceptor sẽ tự động refresh
    return hasRefreshToken();
  }

  return true;
};

export default {
  saveTokens,
  getAccessToken,
  getRefreshToken,
  clearTokens,
  hasAccessToken,
  hasRefreshToken,
  parseJwt,
  isTokenExpired,
  getUserFromToken,
  isAuthenticated,
};
