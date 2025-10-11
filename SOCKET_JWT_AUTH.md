# 🔌 Socket.IO với JWT Authentication

## 📋 Tóm tắt

Project đã được cấu hình để sử dụng **JWT tokens** thay vì **cookies** cho Socket.IO authentication.

## ✅ Ưu điểm

- 🔐 **Bảo mật**: Không cần cookies, tránh CSRF attacks
- 🎯 **Đồng nhất**: Dùng chung JWT với REST API
- 🔄 **Tự động refresh**: Token hết hạn sẽ tự động refresh
- 🚀 **Dễ deploy**: Không cần configure cookie domain

## 🛠️ Cấu hình

### Frontend - `socket.js`

```javascript
const socket = io(BACKEND_URL, {
  auth: {
    token: localStorage.getItem("accessToken"), // ✅ Gửi JWT token
  },
  autoConnect: false, // ❌ Không tự động connect
});
```

### Backend - `index.js`

```javascript
// Socket.IO middleware - Verify JWT token
io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error("Authentication error: No token provided"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id;
    socket.userEmail = decoded.email;
    next();
  } catch (err) {
    return next(new Error("Authentication error: Invalid token"));
  }
});
```

## 📖 Cách sử dụng

### 1. **Sau khi login thành công:**

```javascript
import { connectSocket } from "#utils/socketHelper";

// Login success
localStorage.setItem("accessToken", response.data.accessToken);
localStorage.setItem("refreshToken", response.data.refreshToken);

// Connect socket
connectSocket();
```

### 2. **Khi logout:**

```javascript
import { disconnectSocket } from "#utils/socketHelper";

// Logout
localStorage.removeItem("accessToken");
localStorage.removeItem("refreshToken");

// Disconnect socket
disconnectSocket();
```

### 3. **Khi token refresh:**

```javascript
import { reconnectSocket } from "#utils/socketHelper";

// After refresh token
localStorage.setItem("accessToken", newAccessToken);

// Reconnect socket with new token
reconnectSocket();
```

### 4. **Sử dụng socket trong component:**

```javascript
import socket from "#utils/socket";
import { connectSocket } from "#utils/socketHelper";
import { useEffect } from "react";

function MyComponent() {
  useEffect(() => {
    // Connect socket when component mounts
    connectSocket();

    // Listen for events
    socket.on("newNotification", (data) => {
      console.log("New notification:", data);
    });

    // Cleanup
    return () => {
      socket.off("newNotification");
    };
  }, []);

  return <div>...</div>;
}
```

## 🔄 Luồng hoạt động

### Login Flow:

```
1. User login → Nhận accessToken + refreshToken
2. Lưu vào localStorage
3. connectSocket() → Gửi token qua socket.auth
4. Backend verify token → Connection thành công
```

### Token Refresh Flow:

```
1. API call → 401 Unauthorized
2. api.js interceptor → Refresh token
3. Nhận accessToken mới → Lưu localStorage
4. reconnectSocket() → Reconnect với token mới
5. Backend verify token mới → Connection thành công
```

### Logout Flow:

```
1. User logout → Xóa tokens khỏi localStorage
2. disconnectSocket() → Ngắt kết nối socket
3. Backend nhận disconnect event
```

## 🆚 So sánh Cookie vs JWT

| Feature            | Cookie-based         | JWT-based (hiện tại) |
| ------------------ | -------------------- | -------------------- |
| **Security**       | CSRF vulnerable      | ✅ CSRF-safe         |
| **Implementation** | Cần httpOnly cookies | ✅ Dùng localStorage |
| **Cross-domain**   | Cần configure CORS   | ✅ Không cần config  |
| **Token refresh**  | Phức tạp             | ✅ Đơn giản          |
| **Mobile app**     | Không support tốt    | ✅ Hoạt động tốt     |

## ⚠️ Lưu ý

### 1. **Không tự động connect:**

```javascript
// ❌ Không làm thế này
const socket = io(BACKEND_URL, {
  autoConnect: true, // Socket sẽ connect ngay khi import
});

// ✅ Làm thế này
const socket = io(BACKEND_URL, {
  autoConnect: false, // Đợi gọi connectSocket() thủ công
});
```

### 2. **Update token sau khi refresh:**

```javascript
// ✅ Sau khi refresh token thành công
if (response.data.accessToken) {
  localStorage.setItem("accessToken", response.data.accessToken);
  reconnectSocket(); // ← Quan trọng!
}
```

### 3. **Handle connection errors:**

```javascript
socket.on("connect_error", (error) => {
  if (error.message.includes("Authentication error")) {
    // Token invalid → Redirect to login
    window.location.href = "/login";
  }
});
```

## 🧪 Testing

### 1. **Test connection:**

```javascript
// Console Frontend
connectSocket();
// Expected: ✅ Socket connected: <socket-id>

// Console Backend
// Expected: 🔌 User connected: user@email.com (socket-id)
```

### 2. **Test authentication error:**

```javascript
// Remove token
localStorage.removeItem("accessToken");
connectSocket();
// Expected: ❌ Socket connection error: Authentication error: No token provided
```

### 3. **Test token refresh:**

```javascript
// Wait for token to expire (1 hour)
// Make API call → Token refreshed automatically
// Socket should reconnect with new token
```

## 📝 Checklist

- [x] Frontend: `socket.js` sử dụng `auth.token`
- [x] Frontend: `autoConnect: false`
- [x] Backend: Socket.IO middleware verify JWT
- [x] Created: `socketHelper.js` với helper functions
- [x] Documentation: `SOCKET_JWT_AUTH.md`
- [ ] Update: Login component → call `connectSocket()`
- [ ] Update: Logout component → call `disconnectSocket()`
- [ ] Update: Token refresh → call `reconnectSocket()`
- [ ] Testing: Verify socket authentication works

## 🔗 Related Files

- `frontend/src/utils/socket.js` - Socket instance
- `frontend/src/utils/socketHelper.js` - Helper functions
- `backend/index.js` - Socket.IO server setup
- `frontend/src/utils/api.js` - Token refresh logic

---

**Kết luận:** Bạn **KHÔNG CẦN** gắn accessToken vào cookie. Hệ thống đã được cấu hình để gửi JWT token trực tiếp qua `socket.auth` object! 🎉
