import express from 'express';
import FriendController from '../controllers/Friend.controller.js';
const router = express.Router();

router.get('/friend-requests/to', FriendController.getFriendRequestsTo);
router.post('/friend-requests/to/accept', FriendController.acceptFriendRequest);
router.post('/friend-requests/to/reject', FriendController.rejectFriendRequest);
router.get('/friend-requests/from', FriendController.getFriendRequestsFrom);
router.post('/friend-requests/from/cancel', FriendController.cancelFriendRequest);
router.post('/friend-requests/send', FriendController.sendFriendRequest);
router.get('/friend-list', FriendController.getFriendList);
router.post('/friend-list/remove', FriendController.removeFriend);
export default router;
