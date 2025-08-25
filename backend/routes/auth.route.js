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
export default router;
