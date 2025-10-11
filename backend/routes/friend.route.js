import express from "express";
import FriendController from "../controllers/Friend.controller.js";
import requireAuth from "../middlewares/RequireAuth.js";
const router = express.Router();

// All friend operations require authentication
router.get(
  "/friend-requests/to",
  requireAuth,
  FriendController.getFriendRequestsTo
);
router.post(
  "/friend-requests/to/accept",
  requireAuth,
  FriendController.acceptFriendRequest
);
router.post(
  "/friend-requests/to/reject",
  requireAuth,
  FriendController.rejectFriendRequest
);
router.get(
  "/friend-requests/from",
  requireAuth,
  FriendController.getFriendRequestsFrom
);
router.post(
  "/friend-requests/from/cancel",
  requireAuth,
  FriendController.cancelFriendRequest
);
router.post(
  "/friend-requests/send",
  requireAuth,
  FriendController.sendFriendRequest
);
router.get("/friend-list", requireAuth, FriendController.getFriendList);
router.post("/friend-list/remove", requireAuth, FriendController.removeFriend);
export default router;
