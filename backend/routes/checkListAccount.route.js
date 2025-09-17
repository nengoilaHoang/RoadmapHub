import express from 'express';
const router = express.Router();
import CheckListAccountController from '../controllers/CheckListAccount.controller.js';
router.post('/change-item-checklist', CheckListAccountController.changeItemCheckList);
export default router;