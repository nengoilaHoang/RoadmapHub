import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const authenticate = (req, res, next) => {
  //const authHeader = req.headers.authorization;
  const token = req.cookies?.token; // lấy từ cookie
  //console.log("this is token: ", token)
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      //console.log("verify token: ",payload)
      req.authenticate = payload; // Set user nếu token hợp lệ
    } catch (e) {
      // Token sai hoặc hết hạn, bỏ qua không lỗi
      console.log("auth exception:", e)
    }
  }
  // Không có token cũng không lỗi, luôn gọi next
  next();
};

export default authenticate;