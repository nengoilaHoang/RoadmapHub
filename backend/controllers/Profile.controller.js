import ProfileService from "../services/Profile.service.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

class ProfileController{
    getProfile = async (req, res, next) => {
        const token = req.cookies?.token;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decodedToken);
        const { id, email } = decodedToken;
        const profileId = id;
        const profile = await ProfileService.getProfileByAccountId(profileId);
        //console.log("profileId: ", profileId);
        //console.log("profile: ", profile);
        if (!profile) {
            return res.status(404).json({ status: false, message: "Profile not found" });
        }
        return res.status(200).json({ status: true, profile, email});
    };

    updateProfile = async (req, res, next) => {
        const token = req.cookies?.token;
        const { fullname, github, linkedin} = req.body;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = decodedToken;
        const profileId = id
        const updatedProfile = await ProfileService.updateProfile(profileId, fullname, github, linkedin);
        console.log("Updated profile:", updatedProfile);
        if (!updatedProfile) {
            return res.status(404).json({ status: false, message: "Profile not found" });
        }
        return res.status(200).json({ status: true, profile: updatedProfile });
    }
}
export default new ProfileController(ProfileService);