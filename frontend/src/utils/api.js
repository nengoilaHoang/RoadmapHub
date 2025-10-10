import axios from "axios";

// Tạo axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Flag để tránh multiple refresh requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Request interceptor - Thêm token vào header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Tự động refresh token khi hết hạn
api.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", response.status, response.config?.url);
    return response;
  },
  async (error) => {
    console.log("🔴 API Error:", error.response?.status, error.config?.url);
    const originalRequest = error.config;

    // Nếu lỗi 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("🔄 401 detected, attempting to refresh token...");
      // Nếu đang refresh, thêm request vào queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        // Không có refresh token, redirect to login
        console.log("No refresh token found, redirecting to login...");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        // Gọi API refresh token
        console.log("🔄 Calling refresh token API...");
        const response = await axios.post(
          "http://localhost:5000/api/auth/refresh-token",
          { refreshToken: refreshToken }
        );

        console.log("✅ Refresh token response:", response.data);

        if (response.data.status && response.data.accessToken) {
          const newAccessToken = response.data.accessToken;

          // Lưu access token mới
          localStorage.setItem("accessToken", newAccessToken);
          console.log("✅ New access token saved");

          // Cập nhật header cho request ban đầu
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Process tất cả requests trong queue
          processQueue(null, newAccessToken);

          isRefreshing = false;

          // Retry request ban đầu với token mới
          console.log("🔄 Retrying original request...");
          return api(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;

        // Refresh token cũng fail, xóa token và redirect to login
        console.log("Refresh token invalid, redirecting to login...");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
