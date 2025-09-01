import express from 'express';
import FriendController from '../controllers/Friend.controller.js';
const router = express.Router();

router.get('/friend-requests/to', FriendController.getFriendRequestsTo);
router.get('/friend-requests/from', FriendController.getFriendRequestsFrom);
router.post('/friend-requests/send', FriendController.sendFriendRequest);

export default router;
