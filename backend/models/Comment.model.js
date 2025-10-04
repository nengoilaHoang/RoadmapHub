class Comment {
    constructor( id, accountId, classroomId, postId, createDate, content ) {
        this.id = id;
        this.accountId = accountId;
        this.classroomId = classroomId;
        this.postId = postId;
        this.createDate = createDate;
        this.content = content;
    }
}

export default Comment;
