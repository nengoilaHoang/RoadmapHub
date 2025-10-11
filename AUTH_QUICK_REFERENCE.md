# Quick Reference: Authentication Flow

## 🔑 Authentication Middleware

### RequireAuth (Required Authentication)

**File:** `backend/middlewares/RequireAuth.js`

**Purpose:** Bắt buộc phải có valid access token

**Usage:**

```javascript
import requireAuth from "../middlewares/RequireAuth.js";

router.post("/protected-route", requireAuth, Controller.method);
```

**Behavior:**

- ✅ Valid token → Set `req.authenticate` với payload {id, userName, email} → next()
- ❌ No token → Return 401 with code "NO_TOKEN"
- ❌ Expired token → Return 401 with code "TOKEN_EXPIRED"
- ❌ Invalid token → Return 401 with code "INVALID_TOKEN"

**Token Source:** ONLY `Authorization: Bearer <token>` header

---

## 🛣️ Route Patterns

### Public Routes (No Authentication)

```javascript
// No middleware
router.get("/public", Controller.method);
```

### Protected Routes (Required Authentication)

```javascript
// With requireAuth middleware
router.post("/protected", requireAuth, Controller.method);
```

---

## 🎯 Controller Access Pattern

### In Protected Routes

```javascript
// ✅ CORRECT - req.authenticate always exists
async method(req, res) {
  const { id, email } = req.authenticate;
  // ... use id and email
}
```

### ❌ WRONG - Don't check anymore

```javascript
// ❌ DEPRECATED - Don't do this
async method(req, res) {
  if (!req.authenticate) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  // ...
}
```

---

## 📝 Quick Migration Guide

### Step 1: Add requireAuth to route

```javascript
// Before
router.post("/route", Controller.method);

// After
import requireAuth from "../middlewares/RequireAuth.js";
router.post("/route", requireAuth, Controller.method);
```

### Step 2: Remove checks in controller

```javascript
// Before
async method(req, res) {
  if (!req.authenticate) {
    return res.status(401).json({ ... });
  }
  const id = req.authenticate.id;
}

// After
async method(req, res) {
  const { id } = req.authenticate;
}
```

---

## 🔍 Error Codes

| Code            | Description             | Action                 |
| --------------- | ----------------------- | ---------------------- |
| `NO_TOKEN`      | No Authorization header | Redirect to login      |
| `TOKEN_EXPIRED` | Access token expired    | Auto-refresh token     |
| `INVALID_TOKEN` | Token signature invalid | Logout and login again |

---

## 📦 Token Payload

### Access Token

```javascript
{
  id: "uuid",
  userName: "string",
  email: "string"
}
```

### Refresh Token

```javascript
{
  id: "uuid",
  email: "string"
}
```

---

## 🎨 Frontend Integration

### Using apiWithRefresh

```javascript
import api from "#utils/apiWithRefresh.js";

// Token automatically added to Authorization header
const response = await api.get("/protected-route");
```

### Auto-Refresh Flow

```
1. Request with expired token
2. Get 401 TOKEN_EXPIRED
3. Interceptor catches error
4. Call /auth/refresh-token with refreshToken
5. Get new accessToken
6. Save to localStorage
7. Retry original request
8. Success! ✅
```

---

## 🚨 Common Issues

### Issue: 401 after successful refresh

**Cause:** Middleware reading token from cookie instead of header
**Fix:** Ensure middleware only reads from `Authorization` header

### Issue: req.authenticate undefined

**Cause:** Forgot to add `requireAuth` middleware to route
**Fix:** Add `requireAuth` to route definition

### Issue: Token verified twice

**Cause:** Both global AuthMiddleware and RequireAuth
**Fix:** Remove global AuthMiddleware from index.js

---

## ✅ Checklist

### For New Protected Route:

- [ ] Import `requireAuth` from middlewares
- [ ] Add `requireAuth` to route definition
- [ ] Use `req.authenticate` directly in controller (no checks)
- [ ] Test with valid token → should work
- [ ] Test with expired token → should auto-refresh
- [ ] Test with no token → should return 401 NO_TOKEN

### For New Public Route:

- [ ] NO `requireAuth` middleware
- [ ] Don't access `req.authenticate` in controller
- [ ] Test without token → should work

---

**Last Updated:** October 11, 2025
