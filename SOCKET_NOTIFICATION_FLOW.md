# 🔔 Socket.IO Notification Flow

## 📋 Tổng quan

Hệ thống notification sử dụng Socket.IO với JWT authentication để gửi thông báo real-time từ teacher đến students khi có bài post mới.

## 🔄 Luồng hoạt động chi tiết

### 1️⃣ **User Login & Socket Connection**

```javascript
// frontend/src/components/Home/NavBar.jsx
useEffect(() => {
  if (isLoggedIn) {
    connectSocket(); // Connect với JWT token
    getNotifications(); // Load notifications từ DB

    // Listen for real-time notifications
    socket.on("newNotification", (data) => {
      console.log("📬 New notification received:", data);
      getNotifications(); // Refresh notification list
    });
  }

  return () => {
    socket.off("newNotification");
  };
}, [isLoggedIn]);
```

**Kết quả:**

- ✅ Socket connect với `auth.token` từ localStorage
- ✅ Backend verify JWT và map `userId` → `socketId`
- ✅ User đã sẵn sàng nhận notifications

---

### 2️⃣ **Teacher Create Post**

```javascript
// frontend/src/components/Classroom/ForumClass/ForumClass.jsx
const handlePost = async (content) => {
  await api.post("/posts/create", {
    classroomId: classroomId,
    content: content,
  });
  await getPosts(); // Refresh post list
};
```

**Backend xử lý:**

```javascript
// backend/controllers/Post.controller.js
async createPost(req, res) {
  // 1. Lấy teacher accountId từ token
  const accountId = req.authenticate.id;

  // 2. Tạo post trong database
  const response = await PostService.createPost(classroomId, accountId, content);

  // 3. Lấy danh sách students
  const listStudent = await StudentClassroomService.getAll(classroomId);
  const io = req.app.get("io");
  const userSockets = req.app.get("userSockets");

  // 4. Gửi notification cho từng student
  for (const student of listStudent) {
    const receiverId = student.accountId;

    // a. Lưu notification vào database
    await NotificationService.createNotification(receiverId, senderId, content, link);

    // b. Gửi real-time notification qua Socket.IO
    const socketId = userSockets.get(receiverId);
    if (socketId) {
      io.to(socketId).emit("newNotification", {
        receiverId,
        senderId,
        content: notificationContent,
        link,
        message: "Có bài đăng mới từ giáo viên"
      });
      console.log(`📬 Notification sent to user ${receiverId}`);
    } else {
      console.log(`⚠️ User ${receiverId} offline, saved to DB only`);
    }
  }

  res.json(response);
}
```

---

### 3️⃣ **Student Receive Notification**

```javascript
// frontend/src/components/Home/NavBar.jsx

// Socket listener (đã setup ở step 1)
socket.on("newNotification", (data) => {
  console.log("📬 Received:", data);
  // {
  //   receiverId: "student-id",
  //   senderId: "teacher-id",
  //   content: "Lớp Math: New assignment posted...",
  //   link: "/classroom/view-student/Math/123#post-456",
  //   message: "Có bài đăng mới từ giáo viên"
  // }

  // Refresh notification list từ database
  getNotifications();
});
```

**Kết quả:**

- ✅ Notification badge update ngay lập tức
- ✅ Notification xuất hiện trong dropdown
- ✅ User có thể click để xem chi tiết

---

### 4️⃣ **User Logout**

```javascript
// frontend/src/components/Home/NavBar.jsx
async function onLogout() {
  disconnectSocket(); // Ngắt kết nối socket trước
  await logoutAndRedirect(navigate);
}
```

**Backend xử lý:**

```javascript
// backend/index.js
socket.on("disconnect", () => {
  console.log(`🔌 User disconnected: ${socket.userEmail}`);
  userSockets.delete(socket.userId); // Remove mapping
});
```

---

## 📊 Flow Diagram

```
┌─────────────┐                  ┌─────────────┐
│   Teacher   │                  │   Student   │
└──────┬──────┘                  └──────┬──────┘
       │                                │
       │ 1. Login                       │ 1. Login
       │ ┌──────────────────────┐      │ ┌──────────────────────┐
       ├─┤ connectSocket()      │      ├─┤ connectSocket()      │
       │ │ with JWT token       │      │ │ with JWT token       │
       │ └──────────┬───────────┘      │ └──────────┬───────────┘
       │            │                   │            │
       │            v                   │            v
       │     ┌──────────────┐           │     ┌──────────────┐
       │     │   Backend    │           │     │   Backend    │
       │     │ Verify Token │           │     │ Verify Token │
       │     │ Map userId -> │          │     │ Map userId -> │
       │     │   socketId   │           │     │   socketId   │
       │     └──────────────┘           │     └──────────────┘
       │                                │
       │ 2. Create Post                 │ 3. Listen Socket
       │ ┌──────────────────────┐      │ ┌──────────────────────┐
       ├─┤ POST /posts/create   │      ├─┤ socket.on(          │
       │ │ { classroomId, ... } │      │ │   "newNotification" │
       │ └──────────┬───────────┘      │ └──────────┬───────────┘
       │            │                   │            │
       │            v                   │            │
       │     ┌──────────────┐           │            │
       │     │   Backend    │           │            │
       │     │ 1. Save Post │           │            │
       │     │ 2. Save      │           │            │
       │     │   Notifs DB  │           │            │
       │     │ 3. Emit via  │───────────┼────────────┘
       │     │   Socket.IO  │  Real-time notification
       │     └──────────────┘
       │                                │
       │                                │ 4. Update UI
       │                                │ ┌──────────────────────┐
       │                                ├─┤ getNotifications()  │
       │                                │ │ Update badge count  │
       │                                │ └─────────────────────┘
```

---

## 🔑 Key Points

### ✅ **Đã cải tiến:**

1. **JWT Authentication**: Socket.IO sử dụng JWT token thay vì cookies
2. **Targeted Notifications**: Emit đến từng user cụ thể, không broadcast all
3. **User Socket Mapping**: Map `userId` → `socketId` để track online users
4. **Offline Handling**: Nếu user offline, notification vẫn được lưu vào DB
5. **Auto Connect**: Socket tự động connect khi user login
6. **Auto Disconnect**: Socket tự động disconnect khi user logout

### 📝 **Backend Changes:**

```javascript
// Store userId → socketId mapping
const userSockets = new Map();

io.on("connection", (socket) => {
  userSockets.set(socket.userId, socket.id);
});

// Emit to specific user
const socketId = userSockets.get(receiverId);
if (socketId) {
  io.to(socketId).emit("newNotification", data);
}
```

### 📝 **Frontend Changes:**

```javascript
// Connect socket after login
useEffect(() => {
  if (isLoggedIn) {
    connectSocket(); // ← NEW
    socket.on("newNotification", handleNotification);
  }
}, [isLoggedIn]);

// Disconnect socket before logout
async function onLogout() {
  disconnectSocket(); // ← NEW
  await logoutAndRedirect(navigate);
}
```

---

## 🧪 Testing

### 1. **Test Socket Connection:**

```javascript
// Browser Console (Student)
// Expected output:
// ✅ Socket authenticated for user: student@email.com
// 🔌 User connected: student@email.com (socket-id)
```

### 2. **Test Notification Flow:**

```bash
# Terminal 1: Teacher tạo post
POST http://localhost:5000/api/posts/create
{
  "classroomId": "123",
  "content": "New assignment!"
}

# Browser Console (Student) - Should show:
📬 New notification received via socket: {
  receiverId: "student-id",
  content: "Lớp Math: New assignment!",
  link: "/classroom/view-student/..."
}
```

### 3. **Test Offline User:**

```bash
# Student offline → Teacher tạo post
# Expected Backend Log:
⚠️ User student-id is not connected, notification saved to DB only

# Student login sau đó → Should see notification in dropdown
```

---

## 🐛 Troubleshooting

### Problem: Socket không connect

**Check:**

```javascript
// 1. Token có trong localStorage?
console.log(localStorage.getItem("accessToken"));

// 2. connectSocket() đã được gọi?
// 3. Check browser console for errors
```

### Problem: Không nhận notification

**Check:**

```javascript
// 1. Socket có connected?
console.log(socket.connected); // true?

// 2. Listener có được setup?
socket.listeners("newNotification"); // Should not be empty

// 3. Backend có emit đúng socketId?
// Check backend logs: "📬 Notification sent to user..."
```

### Problem: Nhận nhiều notification trùng

**Fix:**

```javascript
// Cleanup listener trong useEffect
return () => {
  socket.off("newNotification");
};
```

---

## 📁 Files Changed

### Backend:

- ✅ `backend/index.js` - Socket.IO setup với JWT auth
- ✅ `backend/controllers/Post.controller.js` - Emit targeted notifications

### Frontend:

- ✅ `frontend/src/components/Home/NavBar.jsx` - Socket connection & listeners
- ✅ `frontend/src/components/Classroom/ForumClass/ForumClass.jsx` - Create post
- ✅ `frontend/src/utils/socket.js` - Socket instance với JWT
- ✅ `frontend/src/utils/socketHelper.js` - Helper functions

---

## ✅ Checklist

- [x] Backend: JWT middleware cho Socket.IO
- [x] Backend: Map userId → socketId
- [x] Backend: Emit targeted notifications
- [x] Backend: Handle user disconnect
- [x] Frontend: Connect socket on login
- [x] Frontend: Disconnect socket on logout
- [x] Frontend: Listen for newNotification
- [x] Frontend: Remove withCredentials
- [x] Testing: Socket connection works
- [x] Testing: Notifications received real-time
- [x] Documentation: Created this guide

---

**Kết luận:** Luồng socket đã hoàn chỉnh với JWT authentication và targeted notifications! 🎉
