/**
 * Test Script: Kiểm tra Auto Refresh Token
 *
 * Cách test:
 * 1. Login và lưu tokens
 * 2. Đợi access token hết hạn (hoặc manual set expired token)
 * 3. Gọi API bất kỳ
 * 4. Check console log để xem flow
 */

import api from "../utils/apiWithRefresh";
import { getAccessToken, parseJwt } from "../utils/tokenManager";

// Test 1: Kiểm tra token expiration
export const testTokenExpiration = () => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.log("❌ No access token found");
    return;
  }

  const payload = parseJwt(accessToken);
  const expiresAt = new Date(payload.exp * 1000);
  const now = new Date();
  const timeLeft = expiresAt - now;

  console.log("📊 Token Info:");
  console.log("- Expires at:", expiresAt.toLocaleString());
  console.log("- Current time:", now.toLocaleString());
  console.log("- Time left:", Math.floor(timeLeft / 1000 / 60), "minutes");

  if (timeLeft < 0) {
    console.log("⚠️ Token đã hết hạn - sẽ tự động refresh khi gọi API");
  } else {
    console.log("✅ Token còn hợp lệ");
  }
};

// Test 2: Gọi API với token hết hạn
export const testAutoRefresh = async () => {
  console.log("🧪 Testing auto refresh...");

  try {
    // Gọi một API bất kỳ
    console.log("📤 Sending request to /auth/check-login...");
    const response = await api.post("/auth/check-login");

    if (response.data.status) {
      console.log("✅ Request thành công!");
      console.log("👤 User:", response.data.user);
      console.log("🎉 Auto refresh hoạt động tốt!");
    }
  } catch (error) {
    console.error("❌ Request failed:", error);
    if (error.response?.status === 401) {
      console.log("⚠️ Refresh token cũng hết hạn hoặc invalid");
      console.log("→ User cần login lại");
    }
  }
};

// Test 3: Simulate expired token
export const testWithExpiredToken = async () => {
  console.log("🧪 Testing with manually expired token...");

  // Tạo một token đã hết hạn (exp = quá khứ)
  const expiredToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImV4cCI6MTYwMDAwMDAwMH0.invalid";

  // Lưu token expired
  localStorage.setItem("accessToken", expiredToken);

  console.log("⏰ Set expired token");
  console.log("📤 Sending request...");

  try {
    const response = await api.post("/auth/check-login");
    console.log("✅ Auto refresh worked! Response:", response.data);
  } catch (error) {
    console.error("❌ Failed:", error.message);
  }
};

// Test 4: Multiple concurrent requests
export const testConcurrentRequests = async () => {
  console.log("🧪 Testing multiple concurrent requests...");

  try {
    // Gọi nhiều API cùng lúc
    const promises = [
      api.post("/auth/check-login"),
      api.get("/roadmap"),
      api.get("/profile"),
    ];

    console.log("📤 Sending 3 concurrent requests...");
    const results = await Promise.all(promises);

    console.log("✅ All requests succeeded!");
    console.log("→ Queue mechanism hoạt động tốt (chỉ refresh 1 lần)");
    results.forEach((res, i) => {
      console.log(`  Request ${i + 1}:`, res.data.status ? "✅" : "❌");
    });
  } catch (error) {
    console.error("❌ Some requests failed:", error);
  }
};

// Test 5: Check refresh token in localStorage
export const checkStoredTokens = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  console.log("📦 Tokens in localStorage:");
  console.log("- Access Token:", accessToken ? "✅ Present" : "❌ Missing");
  console.log("- Refresh Token:", refreshToken ? "✅ Present" : "❌ Missing");

  if (accessToken) {
    const payload = parseJwt(accessToken);
    console.log("- User ID:", payload?.id);
    console.log("- Email:", payload?.email);
  }
};

// Run all tests
export const runAllTests = async () => {
  console.log("🚀 Starting Refresh Token Tests...\n");

  checkStoredTokens();
  console.log("\n---\n");

  testTokenExpiration();
  console.log("\n---\n");

  await testAutoRefresh();
  console.log("\n---\n");

  await testConcurrentRequests();
  console.log("\n---\n");

  console.log("✅ All tests completed!");
};

export default {
  testTokenExpiration,
  testAutoRefresh,
  testWithExpiredToken,
  testConcurrentRequests,
  checkStoredTokens,
  runAllTests,
};
