# OAuth2 Authorization Code Flow Implementation

## 📋 Tổng quan

Implementation này sử dụng **OAuth2 Authorization Code Flow** - chuẩn bảo mật cao nhất cho OAuth2.

## 🔄 Luồng hoạt động

```
1. User click "Login with Google"
   ↓
2. Frontend gọi GET /api/oauth2/google/url
   ↓
3. Backend trả về Google Auth URL
   ↓
4. Frontend redirect user đến Google
   ↓
5. User đăng nhập và cho phép (Google)
   ↓
6. Google redirect về /auth/google/callback?code=xxx&state=yyy
   ↓
7. Frontend gửi code lên POST /api/oauth2/google/callback
   ↓
8. Backend exchange code với Google → nhận tokens
   ↓
9. Backend verify ID token, tạo/update user
   ↓
10. Backend trả token của hệ thống cho Frontend
   ↓
11. Frontend lưu token và redirect về Home
```

## ⚙️ Setup Google OAuth2

### 1. Tạo Google Cloud Project

1. Vào https://console.cloud.google.com
2. Tạo project mới hoặc chọn project có sẵn
3. Enable **Google+ API**

### 2. Tạo OAuth2 Credentials

1. Vào **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. Chọn **Application type**: Web application
4. Cấu hình:

   ```
   Name: RoadmapHub OAuth2

   Authorized JavaScript origins:
   - http://localhost:3000
   - http://localhost:5000

   Authorized redirect URIs:
   - http://localhost:3000/auth/google/callback
   ```

5. Click **Create**
6. Copy **Client ID** và **Client Secret**

### 3. Update file .env

```env
GOOGLE_CLIENT_ID=123456789-abcdefgh.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-secret-key
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
```

## 🗄️ Database Migration

Chạy SQL migration để thêm support Google OAuth:

```bash
mysql -u root -p roadmap < backend/migrations/add_google_oauth_support.sql
```

Hoặc chạy trực tiếp trong MySQL:

```sql
ALTER TABLE Account
ADD COLUMN googleId VARCHAR(255) NULL UNIQUE,
ADD COLUMN picture VARCHAR(500) NULL;

ALTER TABLE Account
MODIFY COLUMN password VARCHAR(255) NULL;
```

## 📁 Files đã tạo

### Backend:

- `backend/controllers/OAuth2.controller.js` - Controller xử lý OAuth2
- `backend/routes/oauth2.route.js` - Routes cho OAuth2
- `backend/migrations/add_google_oauth_support.sql` - Database migration
- Updated: `backend/services/Account.service.js`
- Updated: `backend/daos/Account.dao.js`
- Updated: `backend/index.js`
- Updated: `backend/.env`

### Frontend:

- `frontend/src/components/Auth/GoogleOAuth2Button.jsx` - Button component
- `frontend/src/pages/Auth/GoogleOAuth2Callback.jsx` - Callback page

## 🚀 Sử dụng

### 1. Update Frontend Routes

Thêm route cho callback page trong `App.jsx`:

```jsx
import GoogleOAuth2Callback from "#pages/Auth/GoogleOAuth2Callback";

// Trong routes:
<Route path="/auth/google/callback" element={<GoogleOAuth2Callback />} />;
```

### 2. Thay thế Google Login Button

Trong `Login.jsx` và `SignUp.jsx`, thay thế:

```jsx
// CŨ - Implicit Flow
import { GoogleLogin } from '@react-oauth/google';
<GoogleLogin onSuccess={handleGoogleSuccess} ... />

// MỚI - Authorization Code Flow
import GoogleOAuth2Button from '#components/Auth/GoogleOAuth2Button';
<GoogleOAuth2Button buttonText="Continue with Google" />
```

### 3. Start servers

```bash
# Backend
cd backend
npm run dev

# Frontend (terminal khác)
cd frontend
npm run dev
```

## 🔒 Bảo mật

### ✅ Ưu điểm so với luồng cũ:

1. **Client Secret không lộ**: Secret chỉ ở backend
2. **CSRF Protection**: Dùng state parameter
3. **Token không lộ ở browser**: Authorization code thay vì token
4. **Refresh token**: Có thể lấy refresh token
5. **ID Token verification**: Verify signature với Google public key

### 🛡️ Security checklist:

- ✅ Client Secret chỉ lưu trong backend .env
- ✅ Verify state parameter để chống CSRF
- ✅ Verify ID token signature
- ✅ Check email_verified từ Google
- ✅ HTTPS trong production
- ✅ httpOnly cookies cho token

## 🔍 Testing

### 1. Test Authorization URL

```bash
curl http://localhost:5000/api/oauth2/google/url
```

Response:

```json
{
  "success": true,
  "authUrl": "https://accounts.google.com/o/oauth2/v2/auth?...",
  "state": "abc123xyz"
}
```

### 2. Test Full Flow

1. Navigate to login page
2. Click "Continue with Google"
3. Login với Google account
4. Cho phép quyền
5. Được redirect về callback → Home

## 📝 API Endpoints

### GET /api/oauth2/google/url

Lấy Google OAuth authorization URL

**Response:**

```json
{
  "success": true,
  "authUrl": "https://accounts.google.com/o/oauth2/v2/auth?...",
  "state": "random_state_string"
}
```

### POST /api/oauth2/google/callback

Exchange authorization code for tokens

**Request:**

```json
{
  "code": "4/0AfJoh...",
  "state": "random_state_string"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Authentication successful",
  "user": {
    "id": "uuid",
    "email": "user@gmail.com",
    "userName": "John Doe"
  },
  "token": "jwt_token",
  "refreshToken": "refresh_token"
}
```

## 🐛 Troubleshooting

### Error: "redirect_uri_mismatch"

- Kiểm tra GOOGLE_REDIRECT_URI trong .env khớp với Google Console
- Đảm bảo URL trong Google Console chính xác (không có trailing slash)

### Error: "invalid_client"

- Kiểm tra GOOGLE_CLIENT_ID và GOOGLE_CLIENT_SECRET
- Đảm bảo OAuth client chưa bị xóa trong Google Console

### Error: "access_denied"

- User đã từ chối quyền
- Bình thường, cho user thử lại

## 📚 References

- [Google OAuth2 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [OAuth2 RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749)
- [OWASP OAuth2 Security](https://cheatsheetseries.owasp.org/cheatsheets/OAuth2_Cheat_Sheet.html)

## 🎯 Production Checklist

- [ ] Update redirect URI với production domain
- [ ] Enable HTTPS
- [ ] Set secure: true trong cookies
- [ ] Update CORS origins
- [ ] Store state trong Redis thay vì memory
- [ ] Implement rate limiting
- [ ] Add logging và monitoring
- [ ] Test với nhiều browsers
