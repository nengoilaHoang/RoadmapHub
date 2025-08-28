import express from 'express';
import AccountController from '../controllers/Account.controller.js';
const router = express.Router();

router.post('/verify-email',AccountController.verifyEmail);
router.get('/verify/:token',AccountController.verify);
router.post('/signup-google',AccountController.signUpGoogle);
router.post('/login',AccountController.login);
router.post('/login/verify',AccountController.loginVerify);
//router.post('/refresh-token', AccountController.refreshToken);
router.post('/check-login', AccountController.checkLogin);
router.post('/logout', AccountController.logout);
router.post('/forgot-password', AccountController.forgotPassword);
router.post('/reset-password/:token/:email', AccountController.resetPassword);
router.post('/change-password', AccountController.changePassword);
// đổi email
router.post('/change-email', AccountController.changeEmail);
router.post('/change-email/verify/:hashedPin/:oldEmail/:newEmail', AccountController.changeEmailVerify);
// xóa tài khoản
router.post('/delete-account', AccountController.deleteAccount);
router.post('/delete-account/verify', AccountController.deleteAccountVerify);
export default router;
