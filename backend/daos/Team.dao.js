import db from '../utils/db.js'
import Team from '../models/Team.model.js';

class teamDAO{
    async getTeamByUserId(userId) {
        const rows = 
        await db('team')
        .join('teammember', 'team.id', 'teammember.teamId')
        .join('account', 'teammember.accountId', 'account.id')
        .where('account.id', userId)
        .distinct('team.id')
        .select('team.*');
        console.log("Account ID:", userId);
        console.log("Rows:", rows);
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