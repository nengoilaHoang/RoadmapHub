# 🔍 Kiểm tra và Loại bỏ Hardcoded URLs

## ✅ Đã hoàn thành

### 1. **Backend** - Sử dụng Environment Variables

- ✅ File `.env` đã có `FRONTEND_URL` và `BACKEND_URL`
- ✅ File `.env.example` đã có template đầy đủ
- ✅ `index.js` đã sử dụng `process.env.FRONTEND_URL`
- ✅ Các controller đã sử dụng `process.env.FRONTEND_URL` và `process.env.BACKEND_URL`

### 2. **Frontend** - Sử dụng Environment Variables

- ✅ Tạo file `.env` với `VITE_API_URL=http://localhost:5000/api`
- ✅ Tạo file `.env.example` với template
- ✅ `api.js` đã sử dụng `import.meta.env.VITE_API_URL`
- ✅ `apiWithRefresh.js` đã sử dụng `import.meta.env.VITE_API_URL`
- ✅ `socket.js` đã sử dụng environment variable

### 3. **Loại bỏ `withCredentials: true`**

✅ Đã loại bỏ trong:

- `ProfileComponent.jsx` (3 chỗ)
- `SettingComponent.jsx` (3 chỗ)
- `ChangeEmailVerify.jsx`
- `RoadmapClassroom.jsx` (6 chỗ)

⚠️ **Còn lại nhiều file chưa xử lý** - Xem danh sách bên dưới

---

## ⚠️ Cần xử lý tiếp

### Files còn `withCredentials: true` (50+ chỗ):

**Authentication:**

- `GoogleOAuth2Callback.jsx`
- `LoginVerify.jsx`
- `Login.jsx`
- `ResetPassword.jsx`
- `userCheckLogin.jsx` (hook)

**Profile & Friends:**

- `ProfilePage.jsx`
- `FriendRequestForm.jsx`
- `FriendRequestFrom.jsx`
- `FriendRequestTo.jsx`
- `FriendList.jsx`
- `RoadmapsComponent.jsx`

**Roadmap:**

- `RoadmapEditPage.jsx` (4 chỗ)
- `RoadmapView.jsx` (3 chỗ)
- `TopBar.jsx`
- `TopicRightBar.jsx` (4 chỗ)
- `AIChatBox.jsx` (2 chỗ)

**Classroom:**

- `ForumClass.jsx` (4 chỗ)
- `ForumStudentClassroom.jsx` (3 chỗ)
- `StudentList.jsx` (2 chỗ)
- `AddStudentForm.jsx`
- `RoadmapStudentClassroom.jsx` (4 chỗ)
- `StudentClassroomView.jsx` (2 chỗ)

**Home:**

- `Home.jsx` (3 chỗ)
- `NavBar.jsx` (2 chỗ)

---

## 🛠️ Cách loại bỏ `withCredentials: true`

### ❌ Trước đây:

```javascript
const res = await api.get("/profiles/get-profile", {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
```

### ✅ Bây giờ:

```javascript
// Token tự động được thêm bởi api.js interceptor
const res = await api.get("/profiles/get-profile");
```

### Lý do:

- ✅ Hệ thống đang dùng **JWT tokens trong localStorage**, không phải cookies
- ✅ `api.js` interceptor **tự động thêm** `Authorization: Bearer {token}` vào header
- ✅ Backend `requireAuth` middleware **tự động decode** token và set `req.authenticate`
- ✅ `withCredentials: true` chỉ cần cho **Socket.IO** (đã giữ lại)

---

## 📋 Script tự động loại bỏ

Bạn có thể chạy script sau để tự động loại bỏ `withCredentials: true`:

```bash
# Tìm tất cả các file có withCredentials
cd frontend/src
grep -r "withCredentials.*true" --include="*.jsx" --include="*.js" .

# Hoặc dùng sed để thay thế tự động (cẩn thận!)
# find . -name "*.jsx" -o -name "*.js" | xargs sed -i 's/,\\s*{\\s*withCredentials:\\s*true\\s*}//g'
```

**⚠️ Lưu ý:** Giữ lại `withCredentials: true` trong `socket.js` vì Socket.IO cần nó!

---

## 🚀 Deploy Production

### Backend `.env`:

```env
FRONTEND_URL=https://your-app.vercel.app
BACKEND_URL=https://your-api.herokuapp.com
```

### Frontend `.env`:

```env
VITE_API_URL=https://your-api.herokuapp.com/api
```

---

## ✅ Checklist

- [x] Backend sử dụng `process.env.FRONTEND_URL`
- [x] Backend sử dụng `process.env.BACKEND_URL`
- [x] Frontend tạo `.env` với `VITE_API_URL`
- [x] `api.js` sử dụng `import.meta.env.VITE_API_URL`
- [x] `apiWithRefresh.js` sử dụng `import.meta.env.VITE_API_URL`
- [x] `socket.js` sử dụng environment variable
- [x] Loại bỏ `withCredentials` trong ProfileComponent
- [x] Loại bỏ `withCredentials` trong SettingComponent
- [x] Loại bỏ `withCredentials` trong RoadmapClassroom
- [ ] Loại bỏ `withCredentials` trong 40+ files còn lại (optional)

---

## 📝 Notes

1. **Không cần loại bỏ hết ngay** - Hệ thống vẫn hoạt động bình thường
2. **Ưu tiên**: Các file authentication và profile đã xử lý xong
3. **Khi rảnh**: Dần dần loại bỏ các file còn lại để code sạch hơn
4. **Testing**: Test kỹ sau khi loại bỏ để đảm bảo không bị lỗi

---

## 🔗 Related Files

- `ENV_CONFIGURATION.md` - Hướng dẫn cấu hình environment variables
- `backend/.env.example` - Template cho backend
- `frontend/.env.example` - Template cho frontend
