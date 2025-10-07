// src/socket.js
import { io } from "socket.io-client";

const socket = io("https://roadmaphub.onrender.com", { withCredentials: true });

export default socket;
