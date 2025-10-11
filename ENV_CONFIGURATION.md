# Environment Variables Configuration

## 📋 Overview

Tất cả các URLs và sensitive data đã được chuyển sang biến môi trường để dễ dàng config cho các môi trường khác nhau (development, staging, production).

## 🔧 Setup

### 1. Copy file .env.example

```bash
cd backend
cp .env.example .env
```

### 2. Điền thông tin vào .env

Mở file `.env` và thay thế các placeholder values bằng thông tin thực tế của bạn.

## 📝 Environment Variables

### 🌐 URLs Configuration

#### FRONTEND_URL

URL của frontend application (React/Vite)

**Development:**

```env
FRONTEND_URL=http://localhost:3000
```

**Production:**

```env
FRONTEND_URL=https://your-app.vercel.app
```

**Được sử dụng trong:**

- CORS configuration (`backend/index.js`)
- Email verification links
- Password reset links
- Email change verification
- Account deletion verification
- OAuth2 redirect after success

#### BACKEND_URL

URL của backend API server (Node.js/Express)

**Development:**

```env
BACKEND_URL=http://localhost:5000
```

**Production:**

```env
BACKEND_URL=https://your-api.herokuapp.com
```

**Được sử dụng trong:**

- Email verification links (`/api/accounts/verify/:token`)
- API endpoint references

---

### 🔐 Security Configuration

#### JWT_SECRET

Secret key để ký và verify JWT tokens

**Requirements:**

- Tối thiểu 32 characters
- Nên sử dụng random string
- KHÔNG được chia sẻ hoặc commit vào git

**Generate:**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### CRYPTO_SECRET

Secret key cho CryptoJS encryption (encrypt/decrypt tokens khi gửi qua network)

**Requirements:** Giống JWT_SECRET

#### BCRYPT_SECRET

Secret key cho bcrypt (optional, để tăng security)

#### BCRYPT_SALT_ROUNDS

Số vòng lặp của bcrypt (default: 10)

- Cao hơn = bảo mật hơn nhưng chậm hơn
- Recommended: 10-12

---

### 🗄️ Database Configuration

#### MySQL Configuration

```env
DB_CLIENT=mysql2
DB_PORT=3306
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=roadmap
```

#### MongoDB Configuration (Optional)

```env
MONGO_URI=mongodb://127.0.0.1:27017/roadmap
```

---

### 📧 Email Configuration

#### EMAIL_USERNAME

Gmail address để gửi email

#### EMAIL_PASSWORD

**KHÔNG phải password thường!** Phải là App Password

**Cách lấy Gmail App Password:**

1. Vào https://myaccount.google.com/apppasswords
2. Chọn "Mail" và "Other"
3. Nhập tên app: "RoadmapHub Backend"
4. Copy password (16 ký tự, không có khoảng trắng)

**Được sử dụng cho:**

- Email verification khi signup
- PIN verification khi login
- Password reset emails
- Email change verification
- Account deletion verification

---

### 🔑 Google OAuth2 Configuration

#### GOOGLE_CLIENT_ID

Client ID từ Google Cloud Console

#### GOOGLE_CLIENT_SECRET

Client Secret từ Google Cloud Console

#### GOOGLE_REDIRECT_URI

URL callback sau khi OAuth2 thành công

**Development:**

```env
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
```

**Cách lấy credentials:**

1. Vào https://console.cloud.google.com/apis/credentials
2. Create OAuth 2.0 Client ID
3. Authorized redirect URIs: Add `http://localhost:3000/auth/google/callback`
4. Copy Client ID và Client Secret

---

### 🤖 AI Configuration (Optional)

#### GEMINI_API_KEY

API key cho Google Gemini AI

**Cách lấy:**

1. Vào https://makersuite.google.com/app/apikey
2. Create API key
3. Copy và paste vào .env

---

### ☁️ Cloudinary Configuration (Optional)

#### CLOUDINARY_CLOUD_NAME

Tên cloud của bạn trên Cloudinary

#### CLOUDINARY_API_KEY

API key từ Cloudinary dashboard

#### CLOUDINARY_API_SECRET

API secret từ Cloudinary dashboard

#### CLOUDINARY_FOLDER

Folder name để organize uploads (e.g., "roadmap-uploads")

#### DEFAULT_AVATAR_URL

URL của avatar mặc định cho user mới

**Cách lấy:**

1. Vào https://cloudinary.com/console
2. Copy Cloud name, API Key, API Secret
3. Create folder trong Media Library

---

## 🔄 Updating URLs in Code

### ❌ BEFORE (Hardcoded)

```javascript
// Bad - hardcoded URLs
const verifyLink = `http://localhost:5000/api/accounts/verify/${token}`;
res.redirect("http://localhost:3000");
app.use(cors({ origin: "http://localhost:3000" }));
```

### ✅ AFTER (Environment Variables)

```javascript
// Good - using environment variables
const verifyLink = `${process.env.BACKEND_URL}/api/accounts/verify/${token}`;
res.redirect(process.env.FRONTEND_URL);
app.use(cors({ origin: process.env.FRONTEND_URL }));
```

---

## 🚀 Deployment

### Development

```env
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000
```

### Production

```env
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
BACKEND_URL=https://your-api.herokuapp.com
```

### Staging (Optional)

```env
NODE_ENV=staging
FRONTEND_URL=https://staging.your-app.com
BACKEND_URL=https://staging-api.your-app.com
```

---

## 📁 Files Using Environment Variables

### Backend Files:

- `backend/index.js` - CORS configuration
- `backend/controllers/Account.controller.js` - All email links, redirects
- `backend/controllers/OAuth2.controller.js` - OAuth redirect
- `backend/middlewares/RequireAuth.js` - JWT verification
- `backend/middlewares/AuthMiddleware.js` - JWT verification (not used)
- `backend/services/RefreshToken.service.js` - JWT creation

### Key Locations:

1. **Email Verification**: `${BACKEND_URL}/api/accounts/verify/${token}`
2. **Password Reset**: `${FRONTEND_URL}/reset-password/${token}/${email}`
3. **Email Change**: `${FRONTEND_URL}/change-email/verify/${token}/${oldEmail}/${newEmail}`
4. **Delete Account**: `${FRONTEND_URL}/delete-account/verify/${token}/${email}`
5. **OAuth Success Redirect**: `${FRONTEND_URL}`
6. **CORS Origin**: `${FRONTEND_URL}`

---

## 🔒 Security Best Practices

### ✅ DO:

- Keep `.env` file in `.gitignore`
- Use different secrets for dev/prod
- Rotate secrets regularly
- Use strong, random secrets (32+ chars)
- Use App Passwords for Gmail
- Restrict OAuth redirect URIs

### ❌ DON'T:

- Commit `.env` to git
- Share secrets publicly
- Use same secrets everywhere
- Use simple/guessable secrets
- Use regular Gmail password

---

## 📊 Environment Variables Checklist

### Required (Minimum Setup):

- [ ] `PORT`
- [ ] `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`
- [ ] `JWT_SECRET`
- [ ] `CRYPTO_SECRET`
- [ ] `EMAIL_USERNAME`, `EMAIL_PASSWORD`
- [ ] `FRONTEND_URL`
- [ ] `BACKEND_URL`

### Optional (Enhanced Features):

- [ ] `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` (for OAuth)
- [ ] `GEMINI_API_KEY` (for AI features)
- [ ] `CLOUDINARY_*` (for image uploads)
- [ ] `MONGO_URI` (if using MongoDB)

---

## 🧪 Testing Environment Variables

### Check if all required vars are set:

```javascript
// Add to backend/index.js
const requiredEnvVars = [
  "JWT_SECRET",
  "CRYPTO_SECRET",
  "EMAIL_USERNAME",
  "EMAIL_PASSWORD",
  "FRONTEND_URL",
  "BACKEND_URL",
  "DB_HOST",
  "DB_USER",
  "DB_NAME",
];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`❌ Missing required environment variable: ${varName}`);
    process.exit(1);
  }
});
console.log("✅ All required environment variables are set");
```

---

## 📚 Related Documentation

- [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) - Complete setup guide
- [OAUTH2_IMPLEMENTATION.md](OAUTH2_IMPLEMENTATION.md) - OAuth2 setup
- [REFRESH_TOKEN_GUIDE.md](REFRESH_TOKEN_GUIDE.md) - Token configuration

---

**Last Updated:** October 11, 2025  
**Author:** GitHub Copilot
