import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * Middleware để verify JWT token và require authentication
 * Sử dụng cho protected routes
 */
const requireAuth = (req, res, next) => {
  // Lấy token từ Authorization header (ưu tiên)
  let token = null;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7); // Bỏ "Bearer " prefix
  }

  // Nếu không có token
  if (!token) {
    return res.status(401).json({
      status: false,
      message: "Access token required",
      code: "NO_TOKEN",
    });
  }

  try {
    // Verify token
    console.log("RequireAuth - Verifying token from header:", token);
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("RequireAuth - Token valid for user:", payload);
    req.authenticate = payload; // Set user info
    next();
  } catch (error) {
    // Token invalid hoặc expired
    console.log("Token verification failed:", error.name);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: false,
        message: "Access token expired",
        code: "TOKEN_EXPIRED",
        error: error.name,
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        status: false,
        message: "Invalid token",
        code: "INVALID_TOKEN",
        error: error.name,
      });
    }

    return res.status(401).json({
      status: false,
      message: "Token verification failed",
      error: error.name,
    });
  }
};

export default requireAuth;
