# 🔴 FIX: redirect_uri_mismatch Error

## ❌ Vấn đề:

Google đang chặn vì **Redirect URI không khớp**

## ✅ Giải pháp:

### Bước 1: Vào Google Cloud Console

1. Mở: https://console.cloud.google.com/apis/credentials
2. Đăng nhập với tài khoản đã tạo OAuth Client
3. Tìm OAuth 2.0 Client có ID: `63811731752-1j2m5pdiontrrpvl9htjr17p0pp71aq1`
4. Click vào tên để edit

### Bước 2: Thêm Authorized redirect URIs

Trong phần **"Authorized redirect URIs"**, click **"+ ADD URI"** và thêm:

```
http://localhost:3000/auth/google/callback
```

⚠️ **QUAN TRỌNG:**

- Chính xác từng ký tự
- KHÔNG có dấu "/" ở cuối
- http (không phải https)
- localhost:3000 (không phải 127.0.0.1)

### Bước 3: Thêm Authorized JavaScript origins

Trong phần **"Authorized JavaScript origins"**, thêm:

```
http://localhost:3000
```

### Bước 4: Save

- Click **SAVE** ở dưới cùng
- Đợi 5-10 giây để Google apply changes

### Bước 5: Test lại

1. Restart backend: `cd backend && npm run dev`
2. Vào http://localhost:3000/login
3. Click "Continue with Google"
4. Giờ sẽ redirect đến Google thành công!

---

## 🔍 Screenshot Google Console nên như thế nào:

```
OAuth 2.0 Client ID
Name: RoadmapHub OAuth2
Client ID: 63811731752-1j2m5pdiontrrpvl9htjr17p0pp71aq1.apps.googleusercontent.com
Client Secret: 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

Authorized JavaScript origins:
  http://localhost:3000
  http://localhost:5000

Authorized redirect URIs:
  http://localhost:3000/auth/google/callback
```

---

## 🐛 Nếu vẫn lỗi:

1. **Check chính tả:** URI phải 100% chính xác
2. **Clear browser cache:** Ctrl+Shift+Delete
3. **Đợi vài phút:** Google cần time để sync
4. **Check .env file:** Đảm bảo GOOGLE_REDIRECT_URI khớp
5. **Restart backend:** Kill port 5000 và start lại

## 🎯 Verify setup:

```bash
# Check .env
cat backend/.env | grep GOOGLE

# Expected output:
# GOOGLE_CLIENT_ID=63811731752-1j2m5pdiontrrpvl9htjr17p0pp71aq1.apps.googleusercontent.com
# GOOGLE_CLIENT_SECRET=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
# GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
```
