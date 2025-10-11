import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import geneUUID from "./genUUID.js";

dotenv.config();

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Hàm upload
export const uploadToCloudinary = async (filePath) => {
  try {
    const imgId = geneUUID(); // bạn tạo id riêng để quản lý
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: imgId,
      folder: "user_uploads", // tùy chọn folder để quản lý
      resource_type: "image", // có thể đổi sang 'auto' nếu không chắc
    });
    return result; // result.secure_url là link ảnh dùng được
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};
