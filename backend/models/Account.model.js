export default class Account{

    constructor(id,email,userName, passWord, classLimit)
    {
        this.id = id;
        this.email = email
        this.username = userName;
        this.password = passWord;
        this.classroomLimit = classLimit;
    }
    static fromRow(row) {
        return new Account(row.id,row.email,row.username, row.password, row.classLimit);
    }
}