import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

// 🧩 Log mọi request đi vào proxy
// app.use((req, res, next) => {
//   console.log(`🌐 [${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
//   next();
// });

// 🔹 Proxy API → Backend (port 5000)
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:5000/api",
    changeOrigin: true,
  })
);

// 🔹 Proxy Frontend → React (port 3000)
app.use(
  "/",
  createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: true,
  })
);

// 🔹 Chạy proxy ở cổng 8080
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`🚀 Proxy đang chạy tại http://localhost:${PORT}`);
  console.log("💡 Gợi ý: chạy lệnh 'ngrok http 8080' để public cả FE + BE.");
});
