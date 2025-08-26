import ProfileService from "../services/Profile.service.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Buffer } from 'buffer';
dotenv.config();

class ProfileController{
    getProfile = async (req, res, next) => {
        const token = req.cookies?.token;
        console.log("this is token when get profile: ", token);
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const { id, email } = decodedToken;
        console.log("decoded token id: ", id);
        // Tạo buffer từ object
        const realBuffer = Buffer.from(id.data);
        // Chuyển thành chuỗi
        const profileId = realBuffer.toString();
        const profile = await ProfileService.getProfileByAccountId(profileId);
        console.log("profileId: ", profileId);
        console.log("profile: ", profile);
        if (!profile) {
            return res.status(404).json({ status: false, message: "Profile not found" });
        }
        return res.status(200).json({ status: true, profile, email});
    };

    updateProfile = async (req, res, next) => {

    }
}
export default new ProfileController(ProfileService);