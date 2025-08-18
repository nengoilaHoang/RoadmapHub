import express from 'express';
import AccountController from '../controllers/Account.controller.js';
const router = express.Router();

router.post('/login',AccountController.login);
router.post('/login/verify',AccountController.loginVerify);
export default router;