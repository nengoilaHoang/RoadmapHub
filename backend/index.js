import express from "express";
import dotenv from "dotenv";
dotenv.config();
//import auRoutes from './routes/auth.route.js'
import auRoutes from "./routes/auth.route.js";
import profileRoute from "./routes/profile.route.js";
import roadmapRoutes from "./routes/roadmap.route.js";
import teamRoutes from "./routes/team.route.js";
import friendRoutes from "./routes/friend.route.js";
import checkListAccountRoutes from "./routes/checkListAccount.route.js";
import classroomRoutes from "./routes/classroom.route.js";
import studentclassroomRoutes from "./routes/studentclassroom.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import quizRoutes from "./routes/quiz.route.js";
import notificationRoutes from "./routes/notification.route.js";
import cors from "cors";
// import authenticate from "./middlewares/AuthMiddleware.js"; // REMOVED: Dùng RequireAuth cho protected routes thay vì global middleware
import learnTopicRoutes from "./routes/learnTopic.route.js";
import cookieParser from "cookie-parser";
import connectDB from "./utils/dbmongo.js";
import mongoose from "mongoose";
import LLMRoutes from "./routes/LLM.route.js";
import oauth2Routes from "./routes/oauth2.route.js";
import { createServer } from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

const app = express();

// app.use((req, res, next) => {
//   console.log(`📡 [Backend 5000] ${req.method} ${req.originalUrl}`);
//   next();
// });

app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // FE port
    credentials: true,
  })
);
app.use(express.json());
// app.use("/", authenticate); // REMOVED: Dùng RequireAuth trực tiếp trên từng route cần protect
app.use("/api/accounts", auRoutes);
app.use("/api/profiles", profileRoute);
app.use("/api/auth", auRoutes);
app.use("/api/roadmaps", roadmapRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/learnTopic", learnTopicRoutes);
app.use("/api/checkListAccount", checkListAccountRoutes);
app.use("/api/LLM", LLMRoutes);
app.use("/api/classrooms", classroomRoutes);
app.use("/api/studentclassrooms", studentclassroomRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/oauth2", oauth2Routes); // OAuth2 routes
// app.listen(process.env.PORT, () => {
//     //console.log(`Server is running at http://localhost:${process.env.PORT}`)
// });
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // FE port
    credentials: true,
  },
});

// app.listen(process.env.PORT, async () => {
//     await connectDB();
//     //console.log(`Server is running at http://localhost:${process.env.PORT}`)
// });
httpServer.listen(process.env.PORT, async () => {
  await connectDB();
  //console.log(`Server is running at http://localhost:${process.env.PORT}`)
});

app.set("io", io);

// Socket.IO middleware - Verify JWT token
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  
  if (!token) {
    return next(new Error("Authentication error: No token provided"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id;
    socket.userEmail = decoded.email;
    console.log(`✅ Socket authenticated for user: ${decoded.email}`);
    next();
  } catch (err) {
    console.log("❌ Socket authentication failed:", err.message);
    return next(new Error("Authentication error: Invalid token"));
  }
});

io.on("connection", (socket) => {
  console.log(`🔌 User connected: ${socket.userEmail} (${socket.id})`);

  socket.on("disconnect", () => {
    console.log(`🔌 User disconnected: ${socket.userEmail} (${socket.id})`);
  });
});
