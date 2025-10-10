import ProfileService from "../services/Profile.service.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { uploadToCloudinary } from "../Helps/SaveImgInCloud.js";
dotenv.config();

class ProfileController {
  getProfile = async (req, res, next) => {
    // Lấy thông tin user từ middleware requireAuth
    const { id, email } = req.authenticate;
    const profileId = id;
    const profile = await ProfileService.getProfileByAccountId(profileId);
    ////console.log("profileId: ", profileId);
    ////console.log("profile: ", profile);
    if (!profile) {
      return res
        .status(404)
        .json({ status: false, message: "Profile not found" });
    }
    return res.status(200).json({ status: true, profile, email });
  };

  updateProfile = async (req, res, next) => {
    // Lấy thông tin user từ middleware requireAuth
    const { id } = req.authenticate;
    const { fullname, github, linkedin } = req.body;
    const profileId = id;
    const updatedProfile = await ProfileService.updateProfile(
      profileId,
      fullname,
      github,
      linkedin
    );
    //console.log("Updated profile:", updatedProfile);
    if (!updatedProfile) {
      return res
        .status(404)
        .json({ status: false, message: "Profile not found" });
    }
    return res.status(200).json({ status: true, profile: updatedProfile });
  };

  updateAvatar = async (req, res, next) => {
    const { id } = req.authenticate;
    const file = req.file;
    try {
      //console.log("this is avatar file:", file.path);
      const avatar = await uploadToCloudinary(file.path);
      //console.log("this is avatar url:", avatar.url);
      await ProfileService.updateAvatar(id, avatar.url);
      return res.status(200).json({
        status: true,
        message: "Avatar updated successfully",
        avatarUrl: avatar.url,
      });
    } catch (error) {
      console.error("Error updating avatar:", error);
      return res
        .status(500)
        .json({ status: false, message: "Failed to update avatar" });
    }
  };
}
export default new ProfileController(ProfileService);
