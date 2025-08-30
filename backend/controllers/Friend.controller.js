import FriendService from "../services/Friend.service";
import AccoutService from "../services/Account.service";
class FriendController {
    async getFriendRequestsTo(req, res) {
        const accountId = req.authenticate.id;
        const friendRequests = await FriendService.getFriendRequestsTo(accountId);
        res.json(friendRequests);
    }

    async getFriendRequestsFrom(req, res) {
        const accountId = req.authenticate.id;
        const friendRequests = await FriendService.getFriendRequestsFrom(accountId);
        res.json(friendRequests);
    }

    async sendFriendRequest(req, res) {
        const senderId = req.authenticate.id;
        const receiverId = req.body.receiverId;
        const result = await FriendService.sendFriendRequest(senderId, receiverId);
        res.json(result);
    }
}
export default new FriendController();
