# 🔄 Auto Refresh Token - Quick Guide

## ✅ Đã Hoàn Thành

Hệ thống refresh token đã được tích hợp hoàn toàn với các tính năng:

### Backend:

- ✅ Table `RefreshToken` trong database
- ✅ DAO và Service cho RefreshToken
- ✅ API endpoint `/api/auth/refresh-token`
- ✅ Lưu refresh token vào DB khi login/OAuth2
- ✅ Revoke token khi logout
- ✅ Verify token từ database (không chỉ JWT)

### Frontend:

- ✅ Axios interceptor tự động refresh token
- ✅ Token management utilities
- ✅ Queue mechanism cho concurrent requests
- ✅ Auto retry failed requests sau khi refresh

## 🎯 Cách Sử Dụng

### 1. Import API với Auto Refresh

**QUAN TRỌNG:** Thay vì dùng `api.js`, dùng `apiWithRefresh.js`:

```javascript
// ❌ Cũ - không auto refresh
import api from "./utils/api";

// ✅ Mới - có auto refresh
import api from "./utils/apiWithRefresh";
```

### 2. Sử Dụng Như Bình Thường

```javascript
// Không cần lo lắng về token hết hạn
const response = await api.get("/roadmap");
const data = await api.post("/profile", { name: "John" });
```

### 3. Lưu Tokens Sau Login

```javascript
import { saveTokens } from "./utils/tokenManager";
import CryptoJS from "crypto-js";

// Sau khi login thành công
const decodedToken = CryptoJS.AES.decrypt(encodeToken, CRYPTO_SECRET).toString(
  CryptoJS.enc.Utf8
);

const decodedRefreshToken = CryptoJS.AES.decrypt(
  encodeRefreshToken,
  CRYPTO_SECRET
).toString(CryptoJS.enc.Utf8);

saveTokens(decodedToken, decodedRefreshToken);
```

### 4. Logout Đúng Cách

```javascript
import { clearTokens, getRefreshToken } from "./utils/tokenManager";
import api from "./utils/apiWithRefresh";

const handleLogout = async () => {
  const refreshToken = getRefreshToken();
  await api.post("/auth/logout", { refreshToken });
  clearTokens();
  window.location.href = "/login";
};
```

## 🔄 Cơ Chế Hoạt Động

```
User gọi API → Access token hết hạn → Backend trả 401
                                         ↓
User nhận response ← Request thành công ← Retry với token mới
                                         ↑
                         Lưu token mới ← Backend trả access token mới
                                         ↑
                         Gọi /refresh-token ← Interceptor bắt 401
```

**User không bị logout, không biết gì cả! 🎉**

## 🧪 Test

Trong browser console:

```javascript
// Import test utilities
import tests from "./tests/refreshTokenTest";

// Check tokens
tests.checkStoredTokens();

// Test auto refresh
await tests.testAutoRefresh();

// Run all tests
await tests.runAllTests();
```

## 📁 Files Quan Trọng

### Backend:

- `backend/daos/RefreshToken.dao.js` - Database operations
- `backend/services/RefreshToken.service.js` - Business logic
- `backend/controllers/Account.controller.js` - Login/Refresh endpoints
- `backend/controllers/OAuth2.controller.js` - OAuth2 với refresh token
- `backend/routes/auth.route.js` - Routes

### Frontend:

- `frontend/src/utils/apiWithRefresh.js` - ⭐ **Dùng file này!**
- `frontend/src/utils/tokenManager.js` - Token utilities
- `frontend/src/examples/LoginExample.jsx` - Ví dụ login
- `frontend/src/examples/DashboardExample.jsx` - Ví dụ sử dụng API

## ⚙️ Configuration

File `.env`:

```env
JWT_SECRET=your-secret-key
CRYPTO_SECRET=your-crypto-key
```

## 🔒 Security Features

1. ✅ Refresh token lưu trong database, không chỉ verify JWT
2. ✅ Revoke token khi logout
3. ✅ Track device & IP address
4. ✅ Auto expire sau 7 ngày
5. ✅ Queue mechanism tránh multiple refresh
6. ✅ Access token expire sau 1 giờ

## 🎓 Examples

Xem full examples trong:

- `REFRESH_TOKEN_GUIDE.md` - Hướng dẫn chi tiết
- `frontend/src/examples/` - Code examples
- `frontend/src/tests/` - Test scripts

## 💡 Tips

1. **Luôn dùng `apiWithRefresh.js`** cho authenticated requests
2. **Lưu cả 2 tokens** sau login: accessToken + refreshToken
3. **Clear tokens** khi logout
4. **Check authentication** trước khi render protected routes
5. **Handle redirect** khi refresh token cũng hết hạn

## ❓ Troubleshooting

### Token không tự động refresh?

- Check đã import đúng `apiWithRefresh.js` chưa
- Verify refresh token có trong localStorage
- Check browser console có errors

### Request vẫn fail với 401?

- Refresh token có thể đã hết hạn (7 ngày)
- Check trong DB xem token có bị revoke không
- User cần login lại

### Multiple refresh requests?

- Không có vấn đề! Queue mechanism đã handle
- Chỉ 1 refresh request được gửi, các request khác đợi

---

**🎉 Hệ thống đã sẵn sàng! Bắt đầu sử dụng ngay!**
