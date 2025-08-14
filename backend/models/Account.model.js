export default class Account{

    constructor(id,userName, passWord, name)
    {
        this.id = id;
        this.userName = userName;
        this.passWord = passWord;
        this.name = name;
    }
    static fromRow(row) {
        return new Account(row.id, row.userName, row.passWord, row.name);
    }
}