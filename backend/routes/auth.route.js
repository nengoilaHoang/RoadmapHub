import express from 'express';
import AccountController from '../controllers/Account.controller.js';
const router = express.Router();

router.post('/login',AccountController.login);
router.post('/verify-email',AccountController.verifyEmail);
router.get('/verify/:token',AccountController.verify);
router.post('/signup-google',AccountController.signUpGoogle)
export default router;