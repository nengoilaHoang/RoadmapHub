class Post {
    constructor( id, accountId, classroomId, createDate, content) {
        this.id = id;
        this.accountId = accountId;
        this.classroomId = classroomId;
        this.createDate = createDate;
        this.content = content;
        
    }
    static fromRow(row) {
        return new Post(row.id, row.accountId,row.classroomId, row.createDate, row.content);
    }
}

export default Post;