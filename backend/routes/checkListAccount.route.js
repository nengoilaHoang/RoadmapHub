import express from "express";
import CheckListAccountController from "../controllers/CheckListAccount.controller.js";
import requireAuth from "../middlewares/RequireAuth.js";
const router = express.Router();

// Require authentication for checklist operations
router.post(
  "/change-item-checklist",
  requireAuth,
  CheckListAccountController.changeItemCheckList
);
export default router;
