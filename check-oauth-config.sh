#!/bin/bash

echo "🔍 Checking OAuth2 Configuration..."
echo "=================================="
echo ""

# Check .env file
echo "📝 Backend .env configuration:"
echo "GOOGLE_CLIENT_ID=$(grep GOOGLE_CLIENT_ID backend/.env | cut -d '=' -f2)"
echo "GOOGLE_REDIRECT_URI=$(grep GOOGLE_REDIRECT_URI backend/.env | cut -d '=' -f2)"
echo ""

# Check if backend is running
echo "🌐 Checking if backend is running on port 5000..."
if nc -z localhost 5000 2>/dev/null; then
    echo "✅ Backend is running on port 5000"
    echo ""
    
    echo "🧪 Testing OAuth2 endpoint..."
    RESPONSE=$(curl -s http://localhost:5000/api/oauth2/google/url)
    
    if echo "$RESPONSE" | grep -q "success"; then
        echo "✅ OAuth2 endpoint is working"
        
        # Extract and display the redirect_uri from authUrl
        AUTH_URL=$(echo "$RESPONSE" | grep -o '"authUrl":"[^"]*"' | cut -d'"' -f4)
        REDIRECT_URI=$(echo "$AUTH_URL" | grep -o 'redirect_uri=[^&]*' | cut -d'=' -f2 | sed 's/%3A/:/g' | sed 's/%2F/\//g')
        
        echo ""
        echo "📍 Redirect URI being used:"
        echo "   $REDIRECT_URI"
        echo ""
        echo "⚠️  This MUST match EXACTLY in Google Console:"
        echo "   Go to: https://console.cloud.google.com/apis/credentials"
        echo "   Add this URI to 'Authorized redirect URIs'"
    else
        echo "❌ OAuth2 endpoint returned error:"
        echo "$RESPONSE"
    fi
else
    echo "❌ Backend is NOT running on port 5000"
    echo ""
    echo "To start backend:"
    echo "  cd backend"
    echo "  npm run dev"
fi

echo ""
echo "=================================="
echo "✅ Checklist:"
echo "1. [ ] Backend is running"
echo "2. [ ] .env has correct GOOGLE_CLIENT_ID"
echo "3. [ ] .env has correct GOOGLE_REDIRECT_URI"  
echo "4. [ ] Google Console has matching redirect URI"
echo "5. [ ] No typos in redirect URI"
echo "6. [ ] No trailing slash in redirect URI"
