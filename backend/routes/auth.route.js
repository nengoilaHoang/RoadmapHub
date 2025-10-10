import express from "express";
import AccountController from "../controllers/Account.controller.js";
import requireAuth from "../middlewares/RequireAuth.js";
const router = express.Router();

router.post("/verify-email", AccountController.verifyEmail);
router.get("/verify/:token", AccountController.verify);
router.post("/signup-google", AccountController.signUpGoogle);
router.post("/login", AccountController.login);
router.post("/login/verify", AccountController.loginVerify);
router.post("/refresh-token", AccountController.refreshToken);
router.post("/check-login", requireAuth, AccountController.checkLogin);
router.post("/logout", requireAuth, AccountController.logout);
router.post("/forgot-password", AccountController.forgotPassword);
router.post("/reset-password/:token/:email", AccountController.resetPassword);
router.post("/change-password", requireAuth, AccountController.changePassword);
// đổi email
router.post("/change-email", requireAuth, AccountController.changeEmail);
router.post(
  "/change-email/verify/:hashedPin/:oldEmail/:newEmail",
  requireAuth,
  AccountController.changeEmailVerify
);
// xóa tài khoản
router.post("/delete-account", requireAuth, AccountController.deleteAccount);
router.post(
  "/delete-account/verify",
  requireAuth,
  AccountController.deleteAccountVerify
);
export default router;
