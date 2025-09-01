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
        console.log(friends);
        return friends;
    }
    async getFriendRequestsTo(accountId){
        const rows = await db('friend')
            .join('account as a', 'friend.receiverId', 'a.id')
            .join('account as b', 'friend.senderId', 'b.id')
            .select('friend.*', 'b.email as senderEmail', 'a.email as receiverEmail')
            .where({receiverId: accountId, requestState: 'pending'});
        const friends = rows.map(row => Friend.fromRow(row));
        console.log(friends);
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
}
export default new FriendDAO();