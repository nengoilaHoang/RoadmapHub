import express from 'express';
import AccountController from '../controllers/Account.controller.js';
const router = express.Router();

router.post('/login',AccountController.login);
export default router;