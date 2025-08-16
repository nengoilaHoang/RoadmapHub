export default class Account{

    constructor(id, username, email, password, classroomLimit)
    {
        this.id = id;
        this.userName = username;
        this.email = email;
        this.passWord = password;
        this.classroomLimit = classroomLimit;
    }
    static fromRow(row) {
        return new Account(row.id, row.username, row.email, row.password, row.classroomLimit);
    }
}