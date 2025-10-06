import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            dbName: "roadmap",
            maxPoolSize: 10,        // ✅ Giới hạn connection pool
            serverSelectionTimeoutMS: 5000, // ✅ Timeout nhanh hơn
            socketTimeoutMS: 45000,  // ✅ Timeout cho operations
        });
        //console.log("Connect to MongoDB successfully");   
    } catch (error) {
        console.error("Connect to MongoDB failed:", error);
        process.exit(1);
    }
}

// ✅ Xử lý connection events
mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    //console.log('MongoDB disconnected');
});
export default connectDB;
