import RefreshTokenDAO from "../daos/RefreshToken.dao.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class RefreshTokenService {
  constructor() {
    this.dao = RefreshTokenDAO;
  }

  /**
   * Tạo và lưu refresh token
   * @param {string} accountId - Account ID
   * @param {string} email - User email (for payload)
   * @param {string} deviceInfo - Device information
   * @param {string} ipAddress - IP address
   */
  async createRefreshToken(
    accountId,
    email = null,
    deviceInfo = null,
    ipAddress = null
  ) {
    try {
      // Tạo JWT refresh token với accountId và email
      const payload = {
        id: accountId,
        email: email,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d", // 7 ngày
      });

      // Tính thời gian hết hạn
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 ngày

      // Lưu vào database
      const result = await this.dao.createRefreshToken(
        accountId,
        token,
        expiresAt,
        deviceInfo,
        ipAddress
      );

      return result;
    } catch (error) {
      console.error("Error in createRefreshToken service:", error);
      return {
        success: false,
        message: "Failed to create refresh token",
      };
    }
  }

  /**
   * Verify và lấy thông tin từ refresh token
   */
  async verifyRefreshToken(token) {
    try {
      // Kiểm tra token có tồn tại và hợp lệ trong DB
      const isValid = await this.dao.isTokenValid(token);
      if (!isValid) {
        return {
          success: false,
          message: "Invalid or expired refresh token",
        };
      }

      // Verify JWT token
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      // Lấy thông tin token từ DB
      const refreshToken = await this.dao.getRefreshTokenByToken(token);

      return {
        success: true,
        payload: payload,
        refreshToken: refreshToken,
      };
    } catch (error) {
      console.error("Error verifying refresh token:", error);
      return {
        success: false,
        message: "Invalid refresh token",
      };
    }
  }

  /**
   * Revoke refresh token (khi logout)
   */
  async revokeRefreshToken(token) {
    return await this.dao.revokeRefreshToken(token);
  }

  /**
   * Revoke tất cả refresh token của user (logout all devices)
   */
  async revokeAllRefreshTokens(accountId) {
    return await this.dao.revokeAllRefreshTokens(accountId);
  }

  /**
   * Lấy tất cả refresh token của user
   */
  async getRefreshTokensByAccountId(accountId) {
    return await this.dao.getRefreshTokensByAccountId(accountId);
  }

  /**
   * Xóa các token đã hết hạn (cleanup job)
   */
  async cleanupExpiredTokens() {
    return await this.dao.deleteExpiredTokens();
  }
}

export default new RefreshTokenService();
