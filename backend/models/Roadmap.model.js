export default class Roadmap{

    constructor(id, accountId, teamId, name, password)
    {
        this.id = id;
        this.accountId = accountId;
        this.teamId = teamId;
        this.name = name;
        this.password = password;
    }
    static fromRow(row) {
        return new Roadmap(row.id, row.accountId, row.teamId, row.name, row.password);
    }
}