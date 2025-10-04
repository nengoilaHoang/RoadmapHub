import express from 'express'
import dotenv from 'dotenv';
dotenv.config();
//import auRoutes from './routes/auth.route.js'
import auRoutes from './routes/auth.route.js'
import profileRoute from './routes/profile.route.js'
import roadmapRoutes from './routes/Roadmap.route.js'
import teamRoutes from './routes/team.route.js'
import friendRoutes from './routes/friend.route.js'
import checkListAccountRoutes from './routes/checkListAccount.route.js'
import classroomRoutes from './routes/classroom.route.js'
import studentclassroomRoutes from './routes/studentclassroom.route.js'
import postRoutes from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js';
import quizRoutes from './routes/quiz.route.js'
import notificationRoutes from './routes/notification.route.js'
import cors from 'cors'
import authenticate from './middlewares/AuthMiddleware.js';
import learnTopicRoutes from './routes/learnTopic.route.js'
import cookieParser from "cookie-parser";
import connectDB from './utils/dbmongo.js';
import mongoose from 'mongoose';
import geminiRoutes from './routes/Gemini.route.js'
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express()
app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('Hello World')
})
app.use(cors({
  origin: "http://localhost:3000", // FE port
  credentials: true
}));
app.use(express.json())
app.use('/',authenticate);
app.use('/api/accounts', auRoutes);
app.use('/api/profiles', profileRoute);
app.use('/api/auth', auRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/learnTopic',learnTopicRoutes);
app.use('/api/checkListAccount',checkListAccountRoutes);
app.use('/api/gemini', geminiRoutes);
app.use('/api/classrooms',classroomRoutes);
app.use('/api/studentclassrooms',studentclassroomRoutes);
app.use('/api/posts',postRoutes)
app.use('/api/comments', commentRoutes);
app.use('/api/quizzes',quizRoutes);
app.use('/api/notifications', notificationRoutes);
// app.listen(process.env.PORT, () => {
//     console.log(`Server is running at http://localhost:${process.env.PORT}`)
// });
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // FE port
    credentials: true
  }
});

// app.listen(process.env.PORT, async () => {
//     await connectDB();
//     console.log(`Server is running at http://localhost:${process.env.PORT}`)
// });
httpServer.listen(process.env.PORT, async () => {
  await connectDB();
  console.log(`Server is running at http://localhost:${process.env.PORT}`)
});
app.set("io", io);
io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
  });
});

