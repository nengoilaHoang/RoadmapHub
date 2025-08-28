import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const authenticate = (req, res, next) => {
  const token = req.cookies?.token; // lấy từ cookie
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.authenticate = payload; // Set user nếu token hợp lệ
    } catch (e) {
      console.log("auth exception:", e)
    }
  }
  next();
};

export default authenticate;