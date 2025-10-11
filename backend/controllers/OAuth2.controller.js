import { OAuth2Client } from "google-auth-library";
import axios from "axios";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AccountService from "../services/Account.service.js";
import ProfileService from "../services/Profile.service.js";
import RefreshTokenService from "../services/RefreshToken.service.js";

dotenv.config();

class OAuth2Controller {
  constructor() {
    this.client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
  }

  /**
   * STEP 1: Tạo Google OAuth URL để redirect user
   * Frontend sẽ gọi endpoint này để lấy URL
   */
  getGoogleAuthUrl = async (req, res) => {
    try {
      const state = this.generateState(); // Random state để prevent CSRF

      const authUrl = this.client.generateAuthUrl({
        access_type: "offline", // Để lấy refresh token
        scope: [
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email",
        ],
        state: state,
        prompt: "consent", // Force hiển thị consent screen
      });

      // Lưu state vào session hoặc cache (ở đây dùng đơn giản)
      // Production nên dùng Redis hoặc session store

      return res.status(200).json({
        success: true,
        authUrl: authUrl,
        state: state,
      });
    } catch (error) {
      console.error("Error generating auth URL:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to generate authentication URL",
      });
    }
  };

  /**
   * STEP 2: Callback handler - Google redirect về đây với authorization code
   * Frontend sẽ gửi code lên backend endpoint này
   */
  googleCallback = async (req, res) => {
    const { code, state } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Authorization code is required",
      });
    }

    try {
      // STEP 3: Exchange authorization code for tokens
      const { tokens } = await this.client.getToken(code);

      // tokens chứa:
      // - access_token: để gọi Google APIs
      // - id_token: JWT chứa user info
      // - refresh_token: để lấy access token mới (optional)
      // - expiry_date: thời gian hết hạn

      if (!tokens.id_token) {
        return res.status(400).json({
          success: false,
          message: "No ID token received from Google",
        });
      }

      // STEP 4: Verify ID token và lấy user info
      const ticket = await this.client.verifyIdToken({
        idToken: tokens.id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      // payload chứa:
      // - sub: Google User ID (unique identifier)
      // - email: Email của user
      // - email_verified: Email đã verify chưa
      // - name: Tên đầy đủ
      // - picture: Avatar URL
      // - given_name, family_name: Tên riêng

      if (!payload.email_verified) {
        return res.status(400).json({
          success: false,
          message: "Email not verified by Google",
        });
      }

      // STEP 5: Tìm hoặc tạo user trong database
      let account = await AccountService.getAccountByEmail(payload.email);

      if (!account) {
        // Tạo account mới cho Google user
        // KHÔNG CẦN password vì dùng Google OAuth
        console.log("Creating new Google account for:", payload.email);
        const createResult = await AccountService.createGoogleAccount({
          email: payload.email,
          username: payload.name,
          googleId: payload.sub,
          picture: payload.picture,
        });

        console.log("Create account result:", createResult);

        // Lấy lại account sau khi tạo
        account = await AccountService.getAccountByEmail(payload.email);

        if (!account) {
          console.error("Failed to retrieve account after creation");
          return res.status(500).json({
            success: false,
            message: "Failed to create user account",
          });
        }

        console.log("Account created successfully:", account.id);

        // Tạo profile
        await ProfileService.createProfile(account.id, payload.name);
      } else {
        // User đã tồn tại, update Google ID nếu chưa có
        console.log("Existing account found:", account.id);
        if (!account.googleId) {
          await AccountService.updateGoogleId(account.id, payload.sub);
        }
      }

      // STEP 6: Tạo JWT token cho hệ thống của bạn
      const jwtPayload = {
        id: account.id,
        userName: account.userName || account.username,
        email: account.email,
      };

      const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
        expiresIn: "30s", // ⚠️ TEST ONLY - 30 giây để test refresh token
      });

      // Tạo refresh token và lưu vào DB
      const deviceInfo = req.headers["user-agent"] || null;
      const ipAddress = req.ip || req.connection.remoteAddress || null;
      const refreshTokenResult = await RefreshTokenService.createRefreshToken(
        account.id,
        account.email, // Thêm email vào payload
        deviceInfo,
        ipAddress
      );

      const refreshToken = refreshTokenResult.success
        ? refreshTokenResult.refreshToken.token
        : null;

      // STEP 7: Trả về response
      return res.status(200).json({
        success: true,
        message: "Authentication successful",
        user: {
          id: account.id,
          email: account.email,
          userName: account.userName || account.username,
        },
        token: token,
        refreshToken: refreshToken,
      });
    } catch (error) {
      console.error("OAuth2 callback error:", error);

      if (error.message?.includes("invalid_grant")) {
        return res.status(400).json({
          success: false,
          message:
            "Authorization code has expired or been used. Please try again.",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Authentication failed",
        error: error.message,
      });
    }
  };

  /**
   * Helper: Generate random state for CSRF protection
   */
  generateState() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  /**
   * Optional: Revoke token khi user logout
   */
  revokeToken = async (req, res) => {
    const { token } = req.body;

    try {
      await this.client.revokeToken(token);
      return res.status(200).json({
        success: true,
        message: "Token revoked successfully",
      });
    } catch (error) {
      console.error("Error revoking token:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to revoke token",
      });
    }
  };
}

export default new OAuth2Controller();
