// src/socket.js
import { io } from "socket.io-client";

// const socket = io("http://localhost:5000", { withCredentials: true });
//const socket = io("https://santo-nonductile-agelessly.ngrok-free.dev", { withCredentials: true });
const socket = io("https://matches-bits-alter-thomas.trycloudflare.com/api", { withCredentials: true });

export default socket;
