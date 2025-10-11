import db from "../utils/db.js";
//import connectDB from '../utils/dbmongo.js';
//import mongoose from 'mongoose';
//import { v4 as uuidv4 } from 'uuid';
import Roadmap from "../models/Roadmap.model.js";
import geneUUID from "../Helps/genUUID.js";
import RoadmapSchemaModel from "../models/RoadmapSchema.model.js";
class RoadmapDAO {
  //====================my sql
  async createRoadmap(name, description, accountId) {
    const roadmap = new Roadmap(
      geneUUID(),
      accountId,
      null,
      name,
      description,
      null,
      null,
      null
    );
    await db("Roadmap").insert(roadmap);
    return {
      success: true,
      message: "Create roadmap successfully",
      roadmap: roadmap,
    };
  }
  async editRoadmap(name, description, accountId, roadmapId) {
    await db("Roadmap")
      .where({ accountId: accountId, id: roadmapId })
      .update({ name: name, description: description });
    return {
      success: true,
      message: "Edit roadmap successfully",
    };
  }
  async getRoadmapByAccountIdAndName(accountId, name) {
    const roadmap = await db("Roadmap")
      .where({ accountId: accountId, name: name })
      .select()
      .first();
    return roadmap;
  }
  async deleteRoadmap(name) {
    await db("Roadmap").where({ name }).del();
    return {
      success: true,
      message: "Delete roadmap successfully",
    };
  }
  async checkRoadmap(name, accountId) {
    const exit = await db("Roadmap").where({ name, accountId }).first();
    if (exit) {
      return {
        success: false,
        message: "Name of roadmap already taken",
      };
    } else {
      return {
        success: true,
        message: "Roadmap already created successfully",
      };
    }
  }
  // async editNodeRoadmap(accountId,name,nodes,edges,id) {
  //     const roadmap = RoadmapSchemaModel({accountId,name, roadmapId: id,nodes,edges,id});
  //     await roadmap.save();
  // }
  async getRoadmapByUserId(accountId) {
    const rows = await db("Roadmap")
      .join("Account", "Roadmap.accountId", "Account.id")
      .where("Account.id", accountId)
      .select("Roadmap.*");
    ////console.log("rows: ", rows);
    if (rows.length === 0) {
      return null;
    } else {
      return rows.map((row) => Roadmap.fromRow(row));
    }
  }
  async getRoadmapByTeamId(teamId) {
    await db("Roadmap")
      .join("Team", "Roadmap.teamId", "Team.id")
      .where("Team.id", teamId)
      .select("Roadmap.*");
  }
  async getRoadmapByName(accountId, name) {
    const roadmap = await db("Roadmap")
      .where({ accountId: accountId, name: name })
      .first();
    return roadmap;
  }

  //====================mongoDB
  async editNodeRoadmap(accountId, name, roadmapId, nodes, edges) {
    ////console.log("lll",accountId,name,nodes,edges);
    //await connectDB();
    const roadmap = RoadmapSchemaModel({
      accountId,
      name,
      roadmapId,
      nodes,
      edges,
    });
    await roadmap.save();
  }
  async updateRoadmap(accountId, name, nodes, edges) {
    //await connectDB();
    const roadmap = await RoadmapSchemaModel.findOneAndUpdate(
      { accountId, name },
      { $set: { nodes, edges } },
      { new: true } // trả về document sau khi update
    );
    if (!roadmap) {
      throw new Error("Roadmap không tồn tại");
    }
    return roadmap;
  }
  async checkRoadmapExist(accountId, name) {
    ////console.log("account Id:", accountId, "; roadmap name:", name);
    //await connectDB();

    const roadmap = await RoadmapSchemaModel.findOne(
      { accountId, name },
      { _id: 1 } // chỉ lấy _id cho nhẹ
    );

    ////console.log("roadmap exist:", !!roadmap);
    return !!roadmap; // trả về true nếu tồn tại, false nếu không
  }
  async viewRoadmap(roadmapId) {
    //await connectDB();
    console.log("Check road map db mongo", roadmapId);
    const roadmap = await RoadmapSchemaModel.findOne(
      { roadmapId },
      { nodes: 1, edges: 1, _id: 0 }
    );

    console.log("roadmap: ", roadmap);
    if (!roadmap) {
      return { nodes: [], edges: [] };
    }
    return roadmap;
  }
  async getTopicRoadmapByUserId(roadmapId) {
    // await connectDB();
    const roadmap = await RoadmapSchemaModel.findOne({ roadmapId: roadmapId });
    return roadmap;
  }
}
export default new RoadmapDAO();
