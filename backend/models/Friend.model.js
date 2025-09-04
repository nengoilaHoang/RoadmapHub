export default class Friend {

    constructor(id, senderId, receiverId, requestState, createAt, senderEmail, receiverEmail)
    {
        this.id = id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.requestState = requestState;
        this.createAt = createAt;
        this.senderEmail = senderEmail;
        this.receiverEmail = receiverEmail;
    }
    static fromRow(row) {
        return new Friend(row.id, row.senderId, row.receiverId, row.requestState, row.createAt, row.senderEmail, row.receiverEmail);
    }
}