import db from '../utils/db.js'
import TeamMember from '../models/TeamMember.model.js';

class TeamMemberDAO {
    async createTeamMember(teamId, userId, role) {
        const teamMember = new TeamMember({ id: teamId, accountId: userId, role });
        await db('teammember').insert(teamMember);
        return {
            success: true,
            message: 'Team member added successfully'
        };
    }
    async deleteTeamMember(teamId, userId) {
        await db('teammember').where({ id: teamId, accountId: userId }).del();
        return {
            success: true,
            message: 'Team member removed successfully'
        };
    }
}

export default new TeamMemberDAO();