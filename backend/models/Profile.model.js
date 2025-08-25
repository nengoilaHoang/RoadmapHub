export default class Profile{

    constructor(id, accountId, fullname, github, linkedin, avatar, teams, roadmaps)
    {
        this.id = id;
        this.accountId = accountId;
        this.fullname = fullname;
        this.github = github;
        this.linkedin = linkedin;
        this.avatar = avatar;
    }
    static fromRow(row) {
        return new Profile(row.id, row.accountId, row.fullname, row.github, row.linkedin, row.avatar);
    }
    static getTeams(teams){
        return teams.map(team => team.id);
    }
    static getRoadmaps(roadmaps){
        return roadmaps.map(roadmap => roadmap.id);
    }
}