import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/**
 * Optional authentication middleware
 * Chỉ set req.authenticate nếu có token hợp lệ
 * KHÔNG throw error nếu token invalid (để route tự xử lý)
 */
const authenticate = (req, res, next) => {
  // Lấy token từ cookie HOẶC Authorization header
  // let token = req.cookies?.token;
  let token = null;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7); // Bỏ "Bearer " prefix
  }

  if (token) {
    try {
      console.log("AuthMiddleware - Verifying token from header:", token);
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log("AuthMiddleware - Token valid for user:", payload);
      req.authenticate = payload; // Set user nếu token hợp lệ
    } catch (e) {
      // Token invalid hoặc expired - không set req.authenticate
      // Route handler sẽ tự xử lý nếu cần authentication
      console.log("Token verification failed:", e.name);
    }
  }
  next();
};

export default authenticate;
