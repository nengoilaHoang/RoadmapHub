# 🚀 Quick Setup Guide - OAuth2 Implementation

## ✅ Đã hoàn thành

### Backend:

- ✅ OAuth2Controller
- ✅ OAuth2 Routes
- ✅ Account Service & DAO updates
- ✅ Database migration script
- ✅ .env configuration template

### Frontend:

- ✅ Login page updated (OAuth2 flow)
- ✅ SignUp page updated (OAuth2 flow)
- ✅ OAuth2 Callback page
- ✅ App routes updated

## 📋 Các bước còn lại

### 1. Chạy Database Migration

```bash
cd /home/truong/IdeaProjects/RoadmapHub
mysql -u root -p roadmap < backend/migrations/add_google_oauth_support.sql
```

Hoặc chạy trực tiếp trong MySQL:

```sql
USE roadmap;

-- Thêm cột googleId và picture
ALTER TABLE Account
ADD COLUMN googleId VARCHAR(255) NULL UNIQUE AFTER email,
ADD COLUMN picture VARCHAR(500) NULL AFTER googleId;

-- Thêm index
CREATE INDEX idx_google_id ON Account(googleId);

-- Cho phép password NULL cho Google accounts
ALTER TABLE Account
MODIFY COLUMN password VARCHAR(255) NULL;
```

### 2. Setup Google OAuth2 Credentials

#### Bước 1: Tạo Google Cloud Project

1. Vào https://console.cloud.google.com
2. Tạo project mới (hoặc chọn project có sẵn)
3. Enable **Google+ API** hoặc **People API**

#### Bước 2: Tạo OAuth 2.0 Client ID

1. Vào **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. Chọn **Application type**: **Web application**
4. Điền thông tin:

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

#### Bước 3: Cập nhật .env file

Mở file `backend/.env` và update:

```env
GOOGLE_CLIENT_ID=your-actual-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-actual-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
```

### 3. Test Implementation

#### Terminal 1 - Start Backend

```bash
cd /home/truong/IdeaProjects/RoadmapHub/backend
npm run dev
```

#### Terminal 2 - Start Frontend

```bash
cd /home/truong/IdeaProjects/RoadmapHub/frontend
npm run dev
```

#### Test Flow:

1. Mở http://localhost:3000/login
2. Click "Continue with Google"
3. Đăng nhập với Google account
4. Cho phép quyền truy cập
5. Được redirect về callback → home page

### 4. Verify Database

Sau khi login thành công, check database:

```sql
USE roadmap;
SELECT id, username, email, googleId, picture FROM Account WHERE googleId IS NOT NULL;
```

## 🔍 Debug & Troubleshooting

### Check Backend Logs

```bash
# Terminal backend sẽ show:
✅ MySQL Database connected successfully!
📊 Database: roadmap
🚀 Server is running at http://localhost:5000
```

### Test OAuth2 Endpoint

```bash
curl http://localhost:5000/api/oauth2/google/url
```

Expected response:

```json
{
  "success": true,
  "authUrl": "https://accounts.google.com/o/oauth2/v2/auth?...",
  "state": "abc123xyz"
}
```

### Common Errors

#### Error: "redirect_uri_mismatch"

**Fix:** Check GOOGLE_REDIRECT_URI trong .env khớp với Google Console

#### Error: "invalid_client"

**Fix:** Check GOOGLE_CLIENT_ID và GOOGLE_CLIENT_SECRET

#### Error: Database connection failed

**Fix:**

- Check MySQL đang chạy: `sudo service mysql status`
- Check credentials trong .env
- Chạy migration script

## 📊 Database Schema Changes

```sql
-- Trước
Account (
  id VARCHAR(36),
  username VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255) NOT NULL,  -- Bắt buộc
  status INT
)

-- Sau
Account (
  id VARCHAR(36),
  username VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255) NULL,      -- Có thể NULL
  googleId VARCHAR(255) NULL,      -- Mới
  picture VARCHAR(500) NULL,       -- Mới
  status INT
)
```

## 🔐 Security Notes

- ✅ Client Secret chỉ ở backend .env (không commit lên git)
- ✅ State parameter chống CSRF attacks
- ✅ ID Token được verify với Google's public key
- ✅ Email phải verified bởi Google
- ✅ Authorization code chỉ dùng 1 lần

## 📝 What Changed

### Login.jsx & SignUp.jsx

- ❌ Removed: `@react-oauth/google` package (Implicit Flow)
- ✅ Added: OAuth2 Authorization Code Flow
- ✅ User redirects to Google → returns with code → backend exchanges token

### Backend Flow

```
Old: Frontend → Google → Frontend (with token) → Backend
New: Frontend → Backend → Google → Callback → Backend (exchange) → Frontend
```

### Advantages

- 🔒 More secure (secret never exposed)
- ✅ Standard OAuth2 flow
- ✅ Can get refresh tokens
- ✅ Better for production

## 🎯 Next Steps for Production

- [ ] Update redirect URI with production domain
- [ ] Enable HTTPS
- [ ] Set secure: true in cookies
- [ ] Update CORS origins
- [ ] Implement rate limiting
- [ ] Add monitoring & logging
- [ ] Store state in Redis instead of sessionStorage

## 📚 Documentation

See `OAUTH2_IMPLEMENTATION.md` for detailed documentation.
