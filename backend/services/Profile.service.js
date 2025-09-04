import ProfileDAO from '../daos/Profile.dao.js';

class ProfileService {
  constructor(profileDAO) {
    this.ProfileDAO = profileDAO;
  }

  async getAllProfiles() {
    return await this.ProfileDAO.getAllProfiles();
  }

  async getProfileById(id) {
    return await this.ProfileDAO.getProfileById(id);
  }

  async getProfileByAccountId(accountId) {
    return await this.ProfileDAO.getProfileByAccountId(accountId);
  }

  async createProfile(accountId, fullname, github = null, linkedin = null, avatar = null) {
    return await this.ProfileDAO.createProfile(accountId, fullname, github, linkedin, avatar);
  }

  async updateProfile(id, fullname, github, linkedin) {
    return await this.ProfileDAO.updateProfile(id, fullname, github, linkedin);
  }
  
  async updateAvatar(id, avatar) {
    return await this.ProfileDAO.updateAvatar(id, avatar);
  }

  async deleteProfile(id) {
    return await this.ProfileDAO.deleteProfile(id);
  }

  async deleteProfileByAccountId(accountId) {
    return await this.ProfileDAO.deleteProfileByAccountId(accountId);
  }

  async getProfileTeams(profileId) {
    return await this.ProfileDAO.getProfileTeams(profileId);
  }

  async getProfileRoadmaps(profileId) {
    return await this.ProfileDAO.getProfileRoadmaps(profileId);
  }
}

export default new ProfileService(ProfileDAO);
