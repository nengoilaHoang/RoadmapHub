import express from 'express';
import AccountController from '../controllers/Account.controller.js';
import authenticate from '../middlewares/AuthMiddleware.js';
const router = express.Router();

router.post('/login',AccountController.login);
router.post('/verify-email',AccountController.verifyEmail);
router.get('/verify/:token',AccountController.verify);
router.post('/signup-google',AccountController.signUpGoogle)
router.post('/login',authenticate, AccountController.login);
router.post('/login/verify',authenticate, AccountController.loginVerify);
//router.post('/refresh-token', AccountController.refreshToken);
router.post('/check-login', authenticate, AccountController.checkLogin);
export default router;
