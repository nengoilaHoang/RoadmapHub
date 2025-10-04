class Notification {
    constructor( id,receiverId,senderId, content, isRead, createDate,link ) {
        this.id = id;
        this.receiverId = receiverId;
        this.senderId = senderId;
        this.content = content;
        this.isRead = isRead;
        this.createDate = createDate;
        this.link = link;
    }
    static fromRow(row) {
        return new Notification(
           row.id,
           row.receiverId,
           row.senderId,
           row.content,
           row.isRead,
           row.createDate,
           row.link
        );
    }   
}
export default Notification;