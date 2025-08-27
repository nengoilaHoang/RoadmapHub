import db from '../utils/db.js';
import { v4 as uuidv4 } from 'uuid';
import Profile from '../models/Profile.model.js';

class ProfileDAO {

  async getAllProfiles() {
    const rows = await db('profile').select('*');
    return rows.map(Profile.fromRow);
  }

  async getProfileById(id) {
    const row = await db('profile')
      .where({ id })
      .first();
    return row ? Profile.fromRow(row) : null;
  }

  async getProfileByAccountId(accountId) {
    const row = await db('profile')
      .where({ accountId })
      .first();
    return row ? Profile.fromRow(row) : null;
  }


  async createProfile(accountId, fullname, github = null, linkedin = null, avatar = null) {
    const id = Buffer.from(uuidv4().replace(/-/g, ''), 'hex');
    const profile = new Profile(id, accountId, fullname, github, linkedin, avatar);
    await db('profile').insert(profile);
    return {
      success: true,
      message: 'Profile created successfully',
      profile
    };
  }

  async updateProfile(id, fullname, github, linkedin) {
    // updateFields: { fullname, github, linkedin, avatar }
    //console.log("Updating profile in DAO with id:", id, fullname, github, linkedin);
    const rows = await db('profile')
      .where({ accountId: id })
      .update({ fullname, github, linkedin });
    if (rows === 0) return null;
    return this.getProfileById(id);
  }

  async deleteProfile(id) {
    const rows = await db('profile')
      .where({ id })
      .del();
    return rows > 0;
  }

  // Optional: Get Teams for a profile (if you have a join table)
  async getProfileTeams(profileId) {
    const teamRows = await db('team')
      .join('teamMember', 'team.id', 'teamMember.teamId')
      .where('teamMember.accountId', profileId)
      .select('team.*');
    return teamRows;
  }

  // Optional: Get Roadmaps for profile (if needed)
  async getProfileRoadmaps(profileId) {
    const roadmapRows = await db('roadmap')
      .where('accountId', profileId)
      .select('*');
    return roadmapRows;
  }

}

export default new ProfileDAO();
