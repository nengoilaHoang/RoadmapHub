/\*\*

- DEBUG GUIDE - Kiểm tra Auto Refresh Token
  \*/

## 🔍 Các Bước Debug

### 1. Kiểm tra Backend Log

Khi access token hết hạn và middleware bắt được, bạn phải thấy log:

```
Token verification failed: TokenExpiredError
```

### 2. Kiểm tra Frontend Console

Khi gọi API với token hết hạn, bạn phải thấy:

```
🔴 API Error: 401 /auth/check-login
🔄 401 detected, attempting to refresh token...
🔄 Calling refresh token API...
✅ Refresh token response: {status: true, accessToken: "..."}
✅ New access token saved
🔄 Retrying original request...
```

### 3. Kiểm tra Network Tab (Chrome DevTools)

- Mở F12 → Network tab
- Filter: XHR/Fetch
- Khi gọi API với token expired:
  1. Request đầu tiên → **401 Unauthorized**
  2. Request refresh-token → **200 OK**
  3. Request retry ban đầu → **200 OK**

### 4. Kiểm tra localStorage

```javascript
// Trong console
console.log("Access Token:", localStorage.getItem("accessToken"));
console.log("Refresh Token:", localStorage.getItem("refreshToken"));
```

---

## 🧪 Test Cases

### Test 1: Login và đợi token hết hạn

```javascript
// 1. Login thành công
// 2. Đợi 6 giây (token expire sau 5s)
// 3. Gọi API check-login
import api from "./utils/apiWithRefresh";

setTimeout(async () => {
  console.log("Testing after 6 seconds...");
  try {
    const res = await api.post("/auth/check-login");
    console.log("✅ Success:", res.data);
  } catch (err) {
    console.error("❌ Failed:", err);
  }
}, 6000);
```

### Test 2: Manual test với expired token

```javascript
// Tạo token expired (exp trong quá khứ)
const expiredToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImV4cCI6MTYwMDAwMDAwMH0.abc";
localStorage.setItem("accessToken", expiredToken);

// Gọi API
import api from "./utils/apiWithRefresh";
const res = await api.post("/auth/check-login");
```

---

## 🐛 Common Issues

### Issue 1: Không thấy log "401 detected"

**Nguyên nhân:** Backend không trả 401
**Giải pháp:**

- Check middleware có đang dùng `requireAuth` không
- Check route có dùng middleware không

### Issue 2: Thấy 401 nhưng không refresh

**Nguyên nhân:**

- Không có refresh token trong localStorage
- Axios interceptor không hoạt động

**Giải pháp:**

```javascript
// Check refresh token
console.log("Has refresh token:", !!localStorage.getItem("refreshToken"));

// Test interceptor
import api from "./utils/apiWithRefresh";
console.log("Interceptors:", api.interceptors.response.handlers.length);
```

### Issue 3: Refresh thành công nhưng retry fail

**Nguyên nhân:** Header Authorization không được update
**Giải pháp:** Check log "Retrying original request..."

### Issue 4: Redirect to /login ngay lập tức

**Nguyên nhân:**

- Refresh token không có trong localStorage
- Refresh token đã hết hạn hoặc bị revoke

**Giải pháp:**

```javascript
// Check refresh token validity
const refreshToken = localStorage.getItem("refreshToken");
if (refreshToken) {
  // Gọi API test
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/refresh-token",
      {
        refreshToken,
      }
    );
    console.log("✅ Refresh token valid:", res.data);
  } catch (err) {
    console.log("❌ Refresh token invalid:", err.response?.data);
  }
}
```

---

## 📋 Checklist

### Backend:

- [ ] `requireAuth` middleware import đúng
- [ ] Route `/auth/check-login` có dùng `requireAuth`
- [ ] Middleware check cả Authorization header và cookie
- [ ] Token expired trả về 401 với code `TOKEN_EXPIRED`
- [ ] Access token expire = 5s (for testing)

### Frontend:

- [ ] Import `api` từ `apiWithRefresh.js` (KHÔNG phải `api.js`)
- [ ] localStorage có `accessToken`
- [ ] localStorage có `refreshToken`
- [ ] Axios interceptor response có log console
- [ ] Browser console mở để xem log

### Flow:

- [ ] Login → Lưu cả 2 tokens
- [ ] Đợi 6 giây
- [ ] Gọi API → Thấy log "401 detected"
- [ ] Thấy log "Calling refresh token API"
- [ ] Thấy log "New access token saved"
- [ ] Thấy log "Retrying original request"
- [ ] API call thành công

---

## 🎯 Quick Debug Command

Paste vào browser console sau khi login:

```javascript
// 1. Check tokens
console.log("=== TOKEN CHECK ===");
console.log(
  "Access Token:",
  localStorage.getItem("accessToken")?.substring(0, 50) + "..."
);
console.log(
  "Refresh Token:",
  localStorage.getItem("refreshToken")?.substring(0, 50) + "..."
);

// 2. Import API
const testAPI = async () => {
  console.log("\n=== WAITING 6 SECONDS ===");
  await new Promise((resolve) => setTimeout(resolve, 6000));

  console.log("\n=== CALLING API ===");
  try {
    // Phải import apiWithRefresh, không phải api
    const api = (await import("./utils/apiWithRefresh.js")).default;
    const res = await api.post("/auth/check-login");
    console.log("✅ SUCCESS:", res.data);
  } catch (err) {
    console.error("❌ FAILED:", err.response?.data || err.message);
  }
};

testAPI();
```

---

## 💡 Expected Flow

```
User → Login → Save tokens (access + refresh)
          ↓
Wait 6 seconds (token expires after 5s)
          ↓
Call API with expired token
          ↓
Backend: 401 TOKEN_EXPIRED
          ↓
Interceptor catches 401
          ↓
Call /auth/refresh-token with refreshToken
          ↓
Backend: Verify refresh token → Return new accessToken
          ↓
Save new accessToken to localStorage
          ↓
Retry original API call with new token
          ↓
Success! ✅
```

Nếu không thấy flow này, check lại từng bước trong checklist trên!
