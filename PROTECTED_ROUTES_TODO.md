# 🔒 Protected Routes - Cần Thêm requireAuth Middleware

## Tổng Quan

Các routes sau đây cần được bảo vệ bằng `requireAuth` middleware để tự động refresh token hoạt động:

---

## 📝 Routes Cần Update

### 1. **auth.route.js** ✅ Đã Update

```javascript
import requireAuth from "../middlewares/RequireAuth.js";

router.post("/check-login", requireAuth, AccountController.checkLogin);
router.post("/logout", requireAuth, AccountController.logout);
router.post("/change-password", requireAuth, AccountController.changePassword);
router.post("/change-email", requireAuth, AccountController.changeEmail);
router.post("/delete-account", requireAuth, AccountController.deleteAccount);
```

### 2. **profile.route.js** - CẦN UPDATE

```javascript
import requireAuth from "../middlewares/RequireAuth.js";

router.get("/get-profile", requireAuth, ProfileController.getProfile);
router.post("/update-profile", requireAuth, ProfileController.updateProfile);
router.post(
  "/update-avatar",
  requireAuth,
  upload.single("avatar"),
  ProfileController.updateAvatar
);
```

### 3. **roadmap.route.js** - CẦN UPDATE

```javascript
import requireAuth from "../middlewares/RequireAuth.js";

// Routes cần authentication
router.post("/create", requireAuth, RoadmapController.createRoadmap);
router.post("/edit/:name", requireAuth, RoadmapController.editRoadmap);
router.post("/delete/:name", requireAuth, RoadmapController.deleteRoadmap);
router.post("/edit-nodes", requireAuth, RoadmapController.editNodeRoadmap);
router.get(
  "/getYourRoadmap/:name",
  requireAuth,
  RoadmapController.getRoadmapByAccountIdAndName
);
router.post(
  "/check-your-roadmap",
  requireAuth,
  RoadmapController.checkYourRoadmap
);
router.get("/edit/view/:roadmapId", requireAuth, RoadmapController.viewRoadmap);
router.get(
  "/getRoadmapByUserId",
  requireAuth,
  RoadmapController.getRoadmapByUserId
);
router.get(
  "/getRoadmapByTeamId/:teamName",
  requireAuth,
  RoadmapController.getRoadmapByTeamId
);
router.get(
  "/getTopicRoadmapByUserId",
  requireAuth,
  RoadmapController.getTopicRoadmapByUserId
);

// Public routes (không cần auth)
router.get("/view/:roadmapId", RoadmapController.viewRoadmapPublic);
```

### 4. **post.route.js** - CẦN UPDATE

```javascript
import requireAuth from "../middlewares/RequireAuth.js";

router.get("/getPosts", PostController.getPosts); // Public - có thể không cần auth
router.post("/create", requireAuth, PostController.createPost);
router.put("/update/:id", requireAuth, PostController.updatePost);
router.delete("/delete/:id", requireAuth, PostController.deletePost);
```

### 5. **comment.route.js** - CẦN UPDATE

```javascript
import requireAuth from "../middlewares/RequireAuth.js";

router.post("/create", requireAuth, CommentController.createComment);
router.put("/update/:id", requireAuth, CommentController.updateComment);
router.delete("/delete/:id", requireAuth, CommentController.deleteComment);
```

### 6. **friend.route.js** - CẦN UPDATE

```javascript
import requireAuth from "../middlewares/RequireAuth.js";

// Tất cả friend routes cần auth
router.use(requireAuth);
```

### 7. **notification.route.js** - CẦN UPDATE

```javascript
import requireAuth from "../middlewares/RequireAuth.js";

router.use(requireAuth); // Tất cả notification routes cần auth
```

### 8. **team.route.js** - CẦN UPDATE

```javascript
import requireAuth from "../middlewares/RequireAuth.js";

// Team management cần auth
router.post("/create", requireAuth, TeamController.create);
router.put("/update/:id", requireAuth, TeamController.update);
router.delete("/delete/:id", requireAuth, TeamController.delete);
```

### 9. **classroom.route.js** - CẦN UPDATE

```javascript
import requireAuth from "../middlewares/RequireAuth.js";

router.use(requireAuth); // Tất cả classroom routes cần auth
```

### 10. **quiz.route.js** - CẦN UPDATE

```javascript
import requireAuth from "../middlewares/RequireAuth.js";

router.use(requireAuth); // Tất cả quiz routes cần auth
```

### 11. **checkListAccount.route.js** - CẦN UPDATE

```javascript
import requireAuth from "../middlewares/RequireAuth.js";

router.use(requireAuth); // Checklist là user-specific
```

### 12. **learnTopic.route.js** - CẦN UPDATE

```javascript
import requireAuth from "../middlewares/RequireAuth.js";

router.use(requireAuth); // Learn topic tracking cần auth
```

---

## 🚀 Quick Update Command

Chạy lệnh sau để update tất cả routes (hoặc update manually):

### Update auth.route.js thêm các routes

```javascript
router.post("/logout", requireAuth, AccountController.logout);
router.post("/change-password", requireAuth, AccountController.changePassword);
router.post("/change-email", requireAuth, AccountController.changeEmail);
router.post("/delete-account", requireAuth, AccountController.deleteAccount);
```

---

## ✅ Checklist Implementation

- [x] **RequireAuth.js** middleware created
- [x] **AuthMiddleware.js** updated (support Authorization header)
- [x] **auth.route.js** - check-login route updated
- [ ] **auth.route.js** - logout, change-password, change-email, delete-account
- [ ] **profile.route.js** - all routes
- [ ] **roadmap.route.js** - user-specific routes
- [ ] **post.route.js** - create, update, delete
- [ ] **comment.route.js** - all routes
- [ ] **friend.route.js** - all routes
- [ ] **notification.route.js** - all routes
- [ ] **team.route.js** - management routes
- [ ] **classroom.route.js** - all routes
- [ ] **quiz.route.js** - all routes
- [ ] **checkListAccount.route.js** - all routes
- [ ] **learnTopic.route.js** - all routes

---

## 🎯 Priority Routes (Test These First)

1. ✅ `/auth/check-login` - Already updated
2. `/profile/get-profile` - User profile
3. `/roadmap/getRoadmapByUserId` - User roadmaps
4. `/post/create` - Create post

Test với access token hết hạn (5s) để verify auto-refresh hoạt động!

---

## 📝 Notes

### Public Routes (Không cần auth):

- `/auth/login`
- `/auth/signup`
- `/auth/verify-email`
- `/auth/forgot-password`
- `/roadmap/view/:roadmapId` (public roadmaps)
- `/post/getPosts` (public feed - optional)

### Protected Routes (Cần auth):

- Mọi route liên quan đến user data
- Create, Update, Delete operations
- User-specific queries (getRoadmapByUserId, etc.)

### Middleware Order:

```javascript
// Global middleware (optional auth)
app.use(authenticate);

// Route-specific middleware (required auth)
router.post("/create", requireAuth, Controller.create);
```

---

## 🧪 Testing

After updating routes, test:

```javascript
// 1. Login
// 2. Wait 6 seconds
// 3. Call protected API
import api from "./utils/apiWithRefresh";

setTimeout(async () => {
  try {
    // Test profile
    await api.get("/profile/get-profile");
    console.log("✅ Profile API works");

    // Test roadmap
    await api.get("/roadmap/getRoadmapByUserId");
    console.log("✅ Roadmap API works");

    // Test post
    await api.post("/post/create", { title: "Test" });
    console.log("✅ Post API works");
  } catch (err) {
    console.error("❌ Failed:", err);
  }
}, 6000);
```

All should auto-refresh and succeed! 🎉
