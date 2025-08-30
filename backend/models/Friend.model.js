export default class Friend {

    constructor(id, senderId, receiverId, requestState, createAt)
    {
        this.id = id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.requestState = requestState;
        this.createAt = createAt;
    }
    static fromRow(row) {
        return new Friend(row.id, row.senderId, row.receiverId, row.requestState, row.createAt);
    }
}