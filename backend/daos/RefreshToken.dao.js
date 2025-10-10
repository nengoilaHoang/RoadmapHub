import db from "../utils/db.js";
import RefreshToken from "../models/RefreshToken.model.js";
import { v4 as uuidv4 } from "uuid";

class RefreshTokenDAO {
  /**
   * Tạo refresh token mới
   */
  async createRefreshToken(
    accountId,
    token,
    expiresAt,
    deviceInfo = null,
    ipAddress = null
  ) {
    try {
      const refreshToken = {
        id: uuidv4(),
        accountId: accountId,
        token: token,
        expiresAt: expiresAt,
        createdAt: new Date(),
        isRevoked: 0,
        deviceInfo: deviceInfo,
        ipAddress: ipAddress,
      };

      await db("RefreshToken").insert(refreshToken);
      return {
        success: true,
        refreshToken: RefreshToken.fromRow(refreshToken),
      };
    } catch (error) {
      console.error("Error creating refresh token:", error);
      return {
        success: false,
        message: "Failed to create refresh token",
      };
    }
  }

  /**
   * Lấy refresh token theo token string
   */
  async getRefreshTokenByToken(token) {
    try {
      const row = await db("RefreshToken")
        .where({ token: token, isRevoked: 0 })
        .first();
      return row ? RefreshToken.fromRow(row) : null;
    } catch (error) {
      console.error("Error getting refresh token:", error);
      return null;
    }
  }

  /**
   * Lấy tất cả refresh token của một account (chưa revoke)
   */
  async getRefreshTokensByAccountId(accountId) {
    try {
      const rows = await db("RefreshToken")
        .where({ accountId: accountId, isRevoked: 0 })
        .orderBy("createdAt", "desc");
      return rows.map(RefreshToken.fromRow);
    } catch (error) {
      console.error("Error getting refresh tokens:", error);
      return [];
    }
  }

  /**
   * Revoke (vô hiệu hóa) một refresh token
   */
  async revokeRefreshToken(token) {
    try {
      const rows = await db("RefreshToken")
        .where({ token: token })
        .update({ isRevoked: 1 });
      return rows > 0;
    } catch (error) {
      console.error("Error revoking refresh token:", error);
      return false;
    }
  }

  /**
   * Revoke tất cả refresh token của một account
   */
  async revokeAllRefreshTokens(accountId) {
    try {
      const rows = await db("RefreshToken")
        .where({ accountId: accountId })
        .update({ isRevoked: 1 });
      return rows > 0;
    } catch (error) {
      console.error("Error revoking all refresh tokens:", error);
      return false;
    }
  }

  /**
   * Xóa các refresh token đã hết hạn
   */
  async deleteExpiredTokens() {
    try {
      const now = new Date();
      const rows = await db("RefreshToken").where("expiresAt", "<", now).del();
      return rows;
    } catch (error) {
      console.error("Error deleting expired tokens:", error);
      return 0;
    }
  }

  /**
   * Kiểm tra refresh token có hợp lệ không
   */
  async isTokenValid(token) {
    try {
      const row = await db("RefreshToken")
        .where({ token: token, isRevoked: 0 })
        .where("expiresAt", ">", new Date())
        .first();
      return !!row;
    } catch (error) {
      console.error("Error checking token validity:", error);
      return false;
    }
  }

  /**
   * Xóa refresh token cụ thể (hard delete)
   */
  async deleteRefreshToken(token) {
    try {
      const rows = await db("RefreshToken").where({ token: token }).del();
      return rows > 0;
    } catch (error) {
      console.error("Error deleting refresh token:", error);
      return false;
    }
  }
}

export default new RefreshTokenDAO();
