// Socket.IO Helper Functions
import socket from "./socket";

/**
 * Connect socket with current access token
 * Call this after login or when token is refreshed
 */
export const connectSocket = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.warn("⚠️ No access token found, cannot connect socket");
    return;
  }

  // Update auth token before connecting
  socket.auth = { token };

  if (!socket.connected) {
    socket.connect();
    console.log("🔌 Socket connecting with token...");
  }
};

/**
 * Disconnect socket
 * Call this on logout
 */
export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
    console.log("🔌 Socket disconnected");
  }
};

/**
 * Reconnect socket with new token
 * Call this after token refresh
 */
export const reconnectSocket = () => {
  disconnectSocket();
  connectSocket();
};

// Handle connection errors
socket.on("connect_error", (error) => {
  console.error("❌ Socket connection error:", error.message);

  // If authentication failed, try to refresh token
  if (error.message.includes("Authentication error")) {
    console.log("🔄 Token may be expired, attempting to reconnect...");
    // The api.js interceptor will handle token refresh
    // After refresh, call reconnectSocket()
  }
});

socket.on("connect", () => {
  console.log("✅ Socket connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("🔌 Socket disconnected:", reason);
});

export default socket;
