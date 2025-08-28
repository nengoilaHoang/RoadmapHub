import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectDB() {
    await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "roadmap"
    });
    console.log("Connect to MongoDB successfully");
}
export default connectDB;
