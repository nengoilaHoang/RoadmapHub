import TeamController from "../controllers/Team.controller.js";
import express from "express";
import requireAuth from "../middlewares/RequireAuth.js";
const router = express.Router();

// Require authentication for team operations
router.get("/get-teams", requireAuth, TeamController.getTeamByUserId);

export default router;
