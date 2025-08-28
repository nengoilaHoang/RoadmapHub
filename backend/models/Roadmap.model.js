export default class Roadmap{
    constructor(id, accountId, teamId, name, description, isPublic, learning, teaching)
    {
        this.id = id;
        this.accountId = accountId;
        this.teamId = teamId;
        this.name = name;
        this.description = description;
        this.isPublic = isPublic;
        this.learning = learning;
        this.teaching = teaching;
    }
    static fromRow(row) {
        return new Roadmap(row.id, row.accountId, row.teamId, row.name, row.description, row.isPublic, row.learning, row.teaching);
    }
}