export default class Roadmap{

    constructor(id, accountId, teamId, name, description)
    {
        this.id = id;
        this.accountId = accountId;
        this.teamId = teamId;
        this.name = name;
        this.description = description;
    }
    static fromRow(row) {
        return new Roadmap(row.id, row.accountId, row.teamId, row.name, row.description);
    }
}