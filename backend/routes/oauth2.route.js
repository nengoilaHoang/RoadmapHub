import express from "express";
import OAuth2Controller from "../controllers/OAuth2.controller.js";

const router = express.Router();

/**
 * @route   GET /api/oauth2/google/url
 * @desc    Lấy Google OAuth URL để redirect
 * @access  Public
 */
router.get("/google/url", OAuth2Controller.getGoogleAuthUrl);

/**
 * @route   POST /api/oauth2/google/callback
 * @desc    Callback endpoint - nhận authorization code và exchange token
 * @access  Public
 */
router.post("/google/callback", OAuth2Controller.googleCallback);

/**
 * @route   POST /api/oauth2/revoke
 * @desc    Revoke Google token (optional)
 * @access  Private
 */
router.post("/revoke", OAuth2Controller.revokeToken);

export default router;
