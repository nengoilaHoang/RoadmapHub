# Logout Implementation

## Overview

Logout flow đã được triển khai đầy đủ với các tính năng:

- Revoke tất cả refresh tokens trên server
- Xóa access token và refresh token khỏi localStorage
- Clear cookie (nếu có)
- Redirect về trang login

## Backend

### API Endpoint

```
POST /accounts/logout
```

**Authentication**: Required (requireAuth middleware)

**Request Headers**:

```
Authorization: Bearer <access_token>
```

**Response Success (200)**:

```json
{
  "status": true,
  "message": "Logout successful",
  "revokedTokens": 2
}
```

**Response Error (500)**:

```json
{
  "status": false,
  "message": "Logout failed",
  "error": "Error message"
}
```

### Controller Logic (`Account.controller.js`)

1. Lấy `accountId` từ `req.authenticate` (từ requireAuth middleware)
2. Gọi `RefreshTokenService.revokeAllRefreshTokens(accountId)` để revoke tất cả refresh tokens
3. Clear cookie (backward compatibility)
4. Trả về số lượng tokens đã revoke

### Database Operation

```javascript
// RefreshToken.dao.js
revokeAllRefreshTokens(accountId) {
  // UPDATE refresh_tokens SET isRevoked = 1 WHERE accountId = ?
}
```

## Frontend

### Utility Function (`utils/logout.js`)

#### `logout()`

Logout user và xóa tokens:

```javascript
import { logout } from "#utils/logout.js";

await logout();
```

#### `logoutAndRedirect(navigate)`

Logout và redirect về trang login:

```javascript
import { logoutAndRedirect } from "#utils/logout.js";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
await logoutAndRedirect(navigate);
```

### Usage Example

```jsx
import { useNavigate } from "react-router-dom";
import { logoutAndRedirect } from "#utils/logout.js";

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutAndRedirect(navigate);
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

## Flow Diagram

```
User clicks Logout
        ↓
Frontend: Call logoutAndRedirect(navigate)
        ↓
Frontend: Call API POST /accounts/logout with Authorization header
        ↓
Backend: requireAuth middleware verifies token
        ↓
Backend: Get accountId from req.authenticate
        ↓
Backend: Revoke all refresh tokens in database (isRevoked = 1)
        ↓
Backend: Clear cookie
        ↓
Backend: Return success response
        ↓
Frontend: Remove accessToken from localStorage
        ↓
Frontend: Remove refreshToken from localStorage
        ↓
Frontend: Navigate to /login
        ↓
Frontend: Reload page
        ↓
User is logged out completely
```

## Security Considerations

1. **Server-side Revocation**: Tất cả refresh tokens được revoke trên server, ngăn chặn việc tái sử dụng
2. **Client-side Cleanup**: Tokens được xóa khỏi localStorage ngay lập tức
3. **Error Handling**: Ngay cả khi API lỗi, tokens vẫn được xóa khỏi client
4. **Authentication Required**: Logout endpoint yêu cầu valid access token (requireAuth middleware)

## Testing

### Test Logout Flow

1. Login với user
2. Kiểm tra tokens trong localStorage và database
3. Click logout
4. Verify:
   - Tokens đã bị xóa khỏi localStorage
   - Refresh tokens trong database có `isRevoked = 1`
   - User được redirect về /login
   - Không thể sử dụng old tokens nữa

### Manual Test với curl

```bash
# 1. Login và lấy access token
curl -X POST http://localhost:5000/accounts/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# 2. Logout với access token
curl -X POST http://localhost:5000/accounts/logout \
  -H "Authorization: Bearer <access_token>"

# 3. Verify không thể dùng old token
curl -X POST http://localhost:5000/accounts/check-login \
  -H "Authorization: Bearer <access_token>"
# Should return 401 TOKEN_EXPIRED or INVALID_TOKEN
```

## Database Schema

```sql
-- Refresh tokens sau khi logout
SELECT * FROM refresh_tokens WHERE accountId = '<user_id>';
-- Tất cả rows phải có isRevoked = 1
```

## Related Files

- Backend:

  - `backend/controllers/Account.controller.js` - logout function
  - `backend/services/RefreshToken.service.js` - revokeAllRefreshTokens
  - `backend/daos/RefreshToken.dao.js` - database operations
  - `backend/middlewares/RequireAuth.js` - authentication middleware
  - `backend/routes/auth.route.js` - logout route

- Frontend:
  - `frontend/src/utils/logout.js` - logout utilities
  - `frontend/src/components/Home/NavBar.jsx` - logout button

## Future Improvements

- [ ] Add device-specific logout (logout from specific device)
- [ ] Add "logout from all devices" option
- [ ] Show confirmation dialog before logout
- [ ] Add logout history/audit log
- [ ] Implement blacklist for access tokens (optional, if needed)
