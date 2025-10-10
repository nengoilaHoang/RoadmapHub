# Hướng Dẫn Sử Dụng Refresh Token

## Tổng Quan

Hệ thống refresh token đã được tích hợp để tự động gia hạn access token khi hết hạn, giúp người dùng không bị đăng xuất giữa chừng.

## Cơ Chế Hoạt Động

1. **Login**: User đăng nhập → Backend tạo access token (1h) và refresh token (7 ngày) → Lưu vào localStorage
2. **Auto Refresh**: Khi access token hết hạn → Frontend tự động gửi refresh token → Backend verify và trả về access token mới
3. **Logout**: User logout → Backend revoke refresh token trong database

## Backend Implementation

### 1. Database Schema

Table `RefreshToken` đã được tạo với cấu trúc:

```sql
- id: VARCHAR(36) PRIMARY KEY
- accountId: VARCHAR(36) - Foreign key to Account table
- token: TEXT - Refresh token string
- expiresAt: DATETIME - Thời gian hết hạn
- createdAt: DATETIME - Thời gian tạo
- isRevoked: TINYINT(1) - Trạng thái revoke (0: active, 1: revoked)
- deviceInfo: VARCHAR(255) - Thông tin device
- ipAddress: VARCHAR(45) - IP address
```

### 2. API Endpoints

#### POST `/api/auth/login`

**Request:**

```json
{
  "email": "user@example.com",
  "passWord": "password123",
  "type": "normal"
}
```

**Response:**

```json
{
  "status": true,
  "message": "Login successful",
  "account": {...},
  "hashedPin": "...",
  "encodeToken": "...",
  "encodeRefreshToken": "..."
}
```

#### POST `/api/auth/refresh-token`

**Request:**

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response Success:**

```json
{
  "status": true,
  "message": "Token refreshed successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response Error:**

```json
{
  "status": false,
  "message": "Invalid or expired refresh token"
}
```

#### POST `/api/auth/logout`

**Request:**

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response:**

```json
{
  "status": true,
  "message": "Logout successful"
}
```

#### POST `/api/oauth2/google/callback`

OAuth2 Google login cũng tạo refresh token tự động.

### 3. Service Methods

**RefreshTokenService:**

- `createRefreshToken(accountId, deviceInfo, ipAddress)` - Tạo refresh token mới
- `verifyRefreshToken(token)` - Verify và lấy thông tin token
- `revokeRefreshToken(token)` - Revoke một token
- `revokeAllRefreshTokens(accountId)` - Revoke tất cả token của user
- `cleanupExpiredTokens()` - Xóa các token đã hết hạn

## Frontend Implementation

### 1. Sử dụng API với Auto Refresh

**Import axios instance với auto refresh:**

```javascript
import api from "./utils/apiWithRefresh";

// Sử dụng như axios thông thường
const response = await api.get("/profile");
const data = await api.post("/roadmap", { name: "My Roadmap" });
```

### 2. Token Management

**Lưu tokens sau khi login:**

```javascript
import { saveTokens, clearTokens } from "./utils/tokenManager";

// Sau khi login thành công
const response = await axios.post("/api/auth/login", {
  email: "user@example.com",
  passWord: "password123",
  type: "normal",
});

// Decode token từ response nếu cần
const decodedToken = CryptoJS.AES.decrypt(
  response.data.encodeToken,
  CRYPTO_SECRET
).toString(CryptoJS.enc.Utf8);

const decodedRefreshToken = CryptoJS.AES.decrypt(
  response.data.encodeRefreshToken,
  CRYPTO_SECRET
).toString(CryptoJS.enc.Utf8);

// Lưu vào localStorage
saveTokens(decodedToken, decodedRefreshToken);
```

**Logout:**

```javascript
import api from "./utils/apiWithRefresh";
import { getRefreshToken, clearTokens } from "./utils/tokenManager";

const handleLogout = async () => {
  const refreshToken = getRefreshToken();

  // Gọi API logout để revoke token
  await api.post("/auth/logout", { refreshToken });

  // Xóa tokens khỏi localStorage
  clearTokens();

  // Redirect to login
  window.location.href = "/login";
};
```

**Kiểm tra authentication:**

```javascript
import {
  isAuthenticated,
  getUserFromToken,
  getAccessToken,
} from "./utils/tokenManager";

// Kiểm tra xem user có đăng nhập không
if (isAuthenticated()) {
  const token = getAccessToken();
  const user = getUserFromToken(token);
  console.log("User:", user);
} else {
  // Redirect to login
  window.location.href = "/login";
}
```

### 3. Protected Routes (React Router)

**Tạo ProtectedRoute component:**

```javascript
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./utils/tokenManager";

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
```

**Sử dụng trong routes:**

```javascript
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

<BrowserRouter>
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
  </Routes>
</BrowserRouter>;
```

## Cách Thức Hoạt Động Chi Tiết

### Auto Refresh Flow

1. User gửi request API với access token đã hết hạn
2. Backend trả về 401 Unauthorized
3. Axios interceptor bắt lỗi 401
4. Interceptor tự động gọi `/api/auth/refresh-token` với refresh token từ localStorage
5. Backend verify refresh token trong database:
   - Kiểm tra token có tồn tại
   - Kiểm tra chưa bị revoke
   - Kiểm tra chưa hết hạn
   - Verify JWT signature
6. Nếu hợp lệ → Backend tạo access token mới và trả về
7. Frontend lưu access token mới vào localStorage
8. Interceptor retry request ban đầu với access token mới
9. User tiếp tục sử dụng như bình thường (không bị logout)

### Security Features

1. **Token Rotation**: Mỗi lần refresh tạo access token mới
2. **Revoke on Logout**: Refresh token bị vô hiệu hóa khi logout
3. **Device Tracking**: Lưu thông tin device và IP để audit
4. **Expiration**: Refresh token tự động hết hạn sau 7 ngày
5. **Database Storage**: Refresh token được lưu và verify từ database, không chỉ verify JWT
6. **Multiple Requests Handling**: Queue mechanism để tránh multiple refresh requests đồng thời

## Maintenance

### Cleanup Expired Tokens

Nên chạy định kỳ để xóa các refresh token đã hết hạn:

```javascript
import RefreshTokenService from "./services/RefreshToken.service.js";

// Có thể dùng cron job
setInterval(async () => {
  const deleted = await RefreshTokenService.cleanupExpiredTokens();
  console.log(`Deleted ${deleted} expired tokens`);
}, 24 * 60 * 60 * 1000); // Mỗi 24 giờ
```

### Revoke All User Sessions

Khi user đổi password, nên revoke tất cả refresh token:

```javascript
import RefreshTokenService from "./services/RefreshToken.service.js";

// Trong changePassword controller
await RefreshTokenService.revokeAllRefreshTokens(accountId);
```

## Testing

### Test Refresh Token Flow

1. Login và lưu tokens
2. Đợi access token hết hạn (hoặc manual thay bằng token expired)
3. Gọi một API bất kỳ
4. Kiểm tra xem có tự động refresh và request thành công không

### Manual Testing với Postman

1. **Login:**

   - POST `/api/auth/login`
   - Lưu lại `encodeRefreshToken`

2. **Test Refresh:**

   - Decode `encodeRefreshToken` (nếu cần)
   - POST `/api/auth/refresh-token`
   - Body: `{ "refreshToken": "..." }`
   - Check response có `accessToken` mới

3. **Test Logout:**
   - POST `/api/auth/logout`
   - Body: `{ "refreshToken": "..." }`
   - Try refresh lại → Should fail

## Troubleshooting

### Access token không tự động refresh

- Kiểm tra `apiWithRefresh.js` đã được import đúng chưa
- Check browser console có lỗi không
- Verify refresh token có trong localStorage không

### Refresh token invalid

- Check refresh token chưa hết hạn (7 ngày)
- Verify chưa bị revoke trong database
- Check JWT_SECRET có đúng không

### Multiple refresh requests

- Interceptor có queue mechanism để handle, check `isRefreshing` flag

## Best Practices

1. **Luôn dùng `apiWithRefresh.js`** cho các API calls cần authentication
2. **Clear tokens khi logout** để tránh security issues
3. **Handle expired refresh token** bằng cách redirect to login
4. **Không lưu sensitive data** trong JWT payload
5. **Use HTTPS** trong production để bảo mật token
6. **Implement rate limiting** cho refresh token endpoint
7. **Monitor failed refresh attempts** để detect attacks

## Environment Variables

Cần có các biến môi trường sau trong `.env`:

```env
JWT_SECRET=your-jwt-secret-key
CRYPTO_SECRET=your-crypto-secret-key
BCRYPT_SALT_ROUNDS=10
```
