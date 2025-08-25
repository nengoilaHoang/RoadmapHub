export default class Team{

    constructor(id, teamName, members, roadmaps)
    {
        this.id = id;
        this.teamName = teamName;
        this.members = members;
        this.roadmaps = roadmaps;
    }
    static fromRow(row) {
        return new Team(row.id, row.teamName, row.members, row.roadmaps);
    }
}