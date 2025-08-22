import express from 'express'
import dotenv from 'dotenv';
dotenv.config();
//import auRoutes from './routes/auth.route.js'
import auRoutes from './routes/auth.route.js'
import cors from 'cors'
import authenticate from './middlewares/AuthMiddleware.js';
import cookieParser from "cookie-parser";
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
app.use('/api/accounts', auRoutes)
// app.listen(5000,()=>{
//     console.log('Server is running at http://localhost:5000')
// })
// app.use('/api/accounts', auRoutes)
app.use('/api/auth', auRoutes)
app.listen(process.env.PORT,()=>{
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
});
