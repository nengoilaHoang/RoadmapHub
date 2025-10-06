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

    async acceptFriendRequest(req, res) {
        ////console.log("run here")
        const {id} = req.body;
        const requestId = id;
        ////console.log("accept Id: ", requestId)
        try {
            await FriendService.acceptFriendRequest(requestId);
            res.json({status: "success"});
        } catch (error) {
            res.json({status: "failed", error:error})
        }
    }

    async rejectFriendRequest(req, res) {
        ////console.log("run here")
        const {id} = req.body;
        const requestId = id;
        ////console.log("accept Id: ", requestId)
        try {
            await FriendService.rejectFriendRequest(requestId);
            res.json({status: "success"});
        } catch (error) {
            res.json({status: "failed", error:error})
        }
    }

    async getFriendRequestsFrom(req, res) {
        const accountId = req.authenticate.id;
        try {
            const friendRequests = await FriendService.getFriendRequestsFrom(accountId);
            ////console.log("Friend Requests:", friendRequests);
            res.json({status: "success", data: friendRequests});
        } catch (error) {
            res.status(500).json({status: "failed", error: "Failed to get friend requests"});
        }
    }

    async cancelFriendRequest(req, res) {
        ////console.log("run here")
        const {id} = req.body;
        const requestId = id;
        ////console.log("accept Id: ", requestId)
        try {
            await FriendService.cancelFriendRequest(requestId);
            res.json({status: "success"});
        } catch (error) {
            res.json({status: "failed", error:error})
        }
    }

    async sendFriendRequest(req, res) {
        const senderId = req.authenticate.id;
        const receiverEmail = req.body.receiverEmail;
        try {
            const receiver = await AccountService.getAccountByEmail(receiverEmail);
            ////console.log("Receiver:", receiver);
            await FriendService.sendFriendRequest(senderId, receiver.id);
            res.json({status: "success"});
        } catch (error) {
            res.status(500).json({status: "failed", error: "Failed to send friend request" });
        }
    }

    async getFriendList(req, res) {
        const userId = req.authenticate.id;
        ////console.log("Get friend list for account ID:", userId);
        try {
            const friends = await FriendService.getFriendList(userId);
            const friendsWithEmail = friends.map(friend => ({
                ...friend,
                email: friend.senderId === userId ? friend.receiverEmail : friend.senderEmail
            }));
            ////console.log("Friend List:", friendsWithEmail);
            res.json({status: "success", data: friendsWithEmail});
        } catch (error) {
            res.status(500).json({status: "failed", error: "Failed to get friend list"+ error});
        }
    }

    async removeFriend(req, res) {
        ////console.log("run here")
        const {id} = req.body;
        const requestId = id;
        ////console.log("accept Id: ", requestId)
        try {
            await FriendService.cancelFriendRequest(requestId);
            res.json({status: "success"});
        } catch (error) {
            res.json({status: "failed", error:error})
        }
    }
}
export default new FriendController();
