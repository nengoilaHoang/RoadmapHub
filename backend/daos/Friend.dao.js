import db from '../utils/db.js'
import Friend from '../models/Friend.model.js';
import genUUID from '../Helps/genUUID.js';

class FriendDAO{
    async getFriendRequestsFrom(accountId){
        const rows = await db('friend')
            .join('account as a', 'friend.receiverId', 'a.id')
            .join('account as b', 'friend.senderId', 'b.id')
            .select('friend.*', 'b.email as senderEmail', 'a.email as receiverEmail')
            .where({senderId: accountId, requestState: 'pending'});
        const friends = rows.map(row => Friend.fromRow(row));
        ////console.log(friends);
        return friends;
    }
    async getFriendRequestsTo(accountId){
        const rows = await db('friend')
            .join('account as a', 'friend.receiverId', 'a.id')
            .join('account as b', 'friend.senderId', 'b.id')
            .select('friend.*', 'b.email as senderEmail', 'a.email as receiverEmail')
            .where({receiverId: accountId, requestState: 'pending'});
        const friends = rows.map(row => Friend.fromRow(row));
        ////console.log(friends);
        return friends;
    }
    async sendFriendRequest(senderId, receiverId){
        const row = await db('friend')
            .insert({
                id: genUUID(),
                senderId: senderId,
                receiverId: receiverId,
                requestState: 'pending',
                createAt: new Date()
            });
        return row;
    }
    async acceptFriendRequest(requestId){
        //console.log("accept rq ID: ",requestId);
        const row = await db('friend')
            .where({id: requestId})
            .update({requestState: 'accepted'});
        return row;
    }
    async rejectFriendRequest(requestId){
        const row = await db('friend')
            .where({id: requestId})
            .update({requestState: 'rejected'});
        return row;
    }
    async cancelFriendRequest(requestId){
        const row = await db('friend')
            .where({id: requestId})
            .delete();
        return row;
    }
    async getFriendsList(accountId){
        ////console.log("Get friends list for account ID in DB:", accountId);
        const rows = await db('friend')
            .join('account as a', 'friend.receiverId', 'a.id')
            .join('account as b', 'friend.senderId', 'b.id')
            .select('friend.*', 'b.email as senderEmail', 'a.email as receiverEmail')
            .where({requestState: 'accepted'})
            .andWhere(function() {
                this.where({senderId: accountId}).orWhere({receiverId: accountId});
            });
        const friends = rows.map(row => Friend.fromRow(row));
        ////console.log(friends);
        return friends;
    }
    async removeFriend(requestId){
        const row = await db('friend')
            .where({id: requestId})
            .delete();
        return row;
    }
}
export default new FriendDAO();