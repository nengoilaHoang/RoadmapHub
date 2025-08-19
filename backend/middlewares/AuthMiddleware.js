import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.authenticate = payload; // Set user nếu token hợp lệ
    } catch (e) {
      // Token sai hoặc hết hạn, bỏ qua không lỗi
    }
  }
  // Không có token cũng không lỗi, luôn gọi next
  next();
};

export default authenticate;