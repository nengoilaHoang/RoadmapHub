import TeamController from "../controllers/Team.controller.js";
import express from "express";
const router = express.Router();

router.get("/get-teams", TeamController.getTeamByUserId);

export default router;
