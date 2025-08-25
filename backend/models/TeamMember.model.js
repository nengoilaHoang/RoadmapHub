export default class TeamMember{

    constructor(AccountId, role)
    {
        this.AccountId = AccountId;
        this.role = role;
    }
    static fromRow(row) {
        return new TeamMember(row.AccountId, row.role);
    }
}
