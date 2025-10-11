// src/socket.js
import { io } from "socket.io-client";

// Get backend URL from environment variable (remove /api suffix)
const BACKEND_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace("/api", "")
  : "http://localhost:5000";

// Connect with JWT token from localStorage (no cookies needed)
const socket = io(BACKEND_URL, {
  auth: {
    token: localStorage.getItem("accessToken"), // Send JWT token for authentication
  },
  autoConnect: false, // Don't connect automatically, wait for manual connect
});

export default socket;
