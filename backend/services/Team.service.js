import TeamDao from "../daos/Team.dao.js";

class TeamService{
    constructor(TeamDao){
        this.teamDao = TeamDao;
    }
    async getTeamByUserId(userId){
        return this.teamDao.getTeamByUserId(userId);
    }
}

export default new TeamService(TeamDao);