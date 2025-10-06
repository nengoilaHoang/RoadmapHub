import FriendDao from "../daos/Friend.dao.js";

class FriendService {
    constructor(friendDao) {
        this.FriendDao = friendDao;
    }
    async getFriendRequestsTo(accountId) {
        return await this.FriendDao.getFriendRequestsTo(accountId);
    }

    async getFriendRequestsFrom(accountId) {
        return await this.FriendDao.getFriendRequestsFrom(accountId);
    }

    async sendFriendRequest(senderId, receiverId) {
        return await this.FriendDao.sendFriendRequest(senderId, receiverId);
    }

    async getFriendList(accountId) {
        ////console.log("Get friends list for account ID in service:", accountId);
        return await this.FriendDao.getFriendsList(accountId);
    }

    async acceptFriendRequest(requestId){
        return await this.FriendDao.acceptFriendRequest(requestId)
    }

    async rejectFriendRequest(requestId){
        return await this.FriendDao.rejectFriendRequest(requestId)
    }

    async cancelFriendRequest(requestId){
        return await this.FriendDao.cancelFriendRequest(requestId)
    }

    async removeFriend(requestId){
        return await this.FriendDao.removeFriend(requestId)
    }
}

export default new FriendService(FriendDao);
