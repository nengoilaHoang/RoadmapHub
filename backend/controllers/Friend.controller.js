import FriendService from "../services/Friend.service.js";
import AccoutService from "../services/Account.service.js";
import AccountService from "../services/Account.service.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
class FriendController {
    async getFriendRequestsTo(req, res) {
        const accountId = req.authenticate.id;
        try {
            const friendRequests = await FriendService.getFriendRequestsTo(accountId);
            res.json({status: "success", data: friendRequests});
        } catch (error) {
            res.status(500).json({status: "failed", error: "Failed to get friend requests"});
        }
    }

    async getFriendRequestsFrom(req, res) {
        const accountId = req.authenticate.id;
        try {
            const friendRequests = await FriendService.getFriendRequestsFrom(accountId);
            //console.log("Friend Requests:", friendRequests);
            res.json({status: "success", data: friendRequests});
        } catch (error) {
            res.status(500).json({status: "failed", error: "Failed to get friend requests"});
        }
    }

    async sendFriendRequest(req, res) {
        const senderId = req.authenticate.id;
        const receiverEmail = req.body.receiverEmail;
        //console.log("Sender ID:", senderId);
        //console.log("Receiver Email:", receiverEmail);
        try {
            const receiver = await AccountService.getAccountByEmail(receiverEmail);
            console.log("Receiver:", receiver);
            await FriendService.sendFriendRequest(senderId, receiver.id);
            res.json({status: "success"});
        } catch (error) {
            res.status(500).json({status: "failed", error: "Failed to send friend request" });
        }
    }
}
export default new FriendController();
