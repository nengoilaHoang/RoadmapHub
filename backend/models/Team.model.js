export default class Team{

    constructor(id, name, members, roadmaps)
    {
        this.id = id;
        this.name = name;
        this.members = members;
        this.roadmaps = roadmaps;
    }
    static teamList(row){
        return new Team(row.id, row.name);
    }
    static fromRow(row) {
        return new Team(row.id, row.name, row.members, row.roadmaps);
    }
}