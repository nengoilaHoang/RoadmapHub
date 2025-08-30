import FriendDao from "../daos/Friend.dao";

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
}

export default new FriendService(FriendDao);
