import db from "../utils/db.js";
import { v4 as uuidv4 } from "uuid";
import Profile from "../models/Profile.model.js";
import geneUUID from "../Helps/genUUID.js";
import dotenv from "dotenv";

dotenv.config();

const nullAvatar =
  process.env.DEFAULT_AVATAR_URL ||
  "https://res-console.cloudinary.com/dk82ocoin/thumbnails/v1/image/upload/v1756572458/NDA0MzI3NC1hdmF0YXItZWluc3RlaW4tcHJvZmVzc29yLXNjaWVudGlzdF8xMTMyNTlfam91cW1n/drilldown";

class ProfileDAO {
  async getAllProfiles() {
    const rows = await db("Profile").select("*");
    return rows.map(Profile.fromRow);
  }

  async getProfileById(id) {
    const row = await db("Profile").where({ id }).first();
    return row ? Profile.fromRow(row) : null;
  }

  async getProfileByAccountId(accountId) {
    //console.log(accountId);
    const row = await db("Profile").where({ accountId }).first();
    return row ? Profile.fromRow(row) : null;
  }

  async createProfile(
    accountId,
    fullname,
    github = null,
    linkedin = null,
    avatar = nullAvatar
  ) {
    const id = geneUUID();
    const profile = new Profile(
      id,
      accountId,
      fullname,
      github,
      linkedin,
      avatar
    );
    await db("Profile").insert(profile);
    return {
      success: true,
      message: "Profile created successfully",
      profile,
    };
  }

  async updateProfile(id, fullname, github, linkedin) {
    // updateFields: { fullname, github, linkedin, avatar }
    ////console.log("Updating profile in DAO with id:", id, fullname, github, linkedin);
    const rows = await db("Profile")
      .where({ accountId: id })
      .update({ fullname, github, linkedin });
    return rows > 0 ? { id, fullname, github, linkedin } : null;
  }

  async updateAvatar(id, avatar) {
    const rows = await db("Profile")
      .where({ accountId: id })
      .update({ avatar });
    return rows > 0 ? { id, avatar } : null;
  }

  async deleteProfile(id) {
    const rows = await db("Profile").where({ id }).del();
    return rows > 0;
  }
  async deleteProfileByAccountId(accountId) {
    const rows = await db("Profile").where({ accountId }).del();
    return rows > 0;
  }
  // Optional: Get Teams for a profile (if you have a join table)
  async getProfileTeams(profileId) {
    const teamRows = await db("Team")
      .join("TeamMember", "Team.id", "TeamMember.teamId")
      .where("TeamMember.accountId", profileId)
      .select("Team.*");
    return teamRows;
  }

  // Optional: Get Roadmaps for profile (if needed)
  async getProfileRoadmaps(profileId) {
    const roadmapRows = await db("Roadmap")
      .where("accountId", profileId)
      .select("*");
    return roadmapRows;
  }
}

export default new ProfileDAO();
