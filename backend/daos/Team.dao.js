import db from '../utils/db.js'
import Team from '../models/Team.model.js';

class teamDAO{
    async getTeamByUserId(userId) {
        const rows = 
        await db('Team')
        .join('Teammember', 'Team.id', 'TeamMember.teamId')
        .join('Account', 'TeamMember.accountId', 'Account.id')
        .where('Account.id', userId)
        .distinct('Team.id')
        .select('Team.*');
        //console.log("Account ID:", userId);
        //console.log("Rows:", rows);
        const teams = rows.map(row => Team.teamList(row));
        if(teams.length > 0){
            return teams;
        }
        else{
            return null;
        }
    }
}

export default new teamDAO();