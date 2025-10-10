## ✅ OAuth2 Setup Checklist

### Bước 1: Database Migration

```bash
mysql -u root -p roadmap < backend/migrations/add_google_oauth_support.sql
```

### Bước 2: Google OAuth Setup

1. [ ] Vào https://console.cloud.google.com/apis/credentials
2. [ ] Create OAuth 2.0 Client ID
3. [ ] Add authorized redirect: `http://localhost:3000/auth/google/callback`
4. [ ] Copy Client ID
5. [ ] Copy Client Secret

### Bước 3: Update .env

Mở `backend/.env` và update:

```env
GOOGLE_CLIENT_ID=paste-your-client-id-here
GOOGLE_CLIENT_SECRET=paste-your-secret-here
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
```

### Bước 4: Start Servers

Terminal 1:

```bash
cd backend && npm run dev
```

Terminal 2:

```bash
cd frontend && npm run dev
```

### Bước 5: Test

1. [ ] Vào http://localhost:3000/login
2. [ ] Click "Continue with Google"
3. [ ] Login Google account
4. [ ] Cho phép quyền
5. [ ] Check redirect về home page
6. [ ] Check database có user mới

### Debug Commands

```bash
# Test backend endpoint
curl http://localhost:5000/api/oauth2/google/url

# Check database
mysql -u root -p roadmap
SELECT * FROM Account WHERE googleId IS NOT NULL;
```

✅ DONE!
