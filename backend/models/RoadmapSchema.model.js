import mongoose from "mongoose";

const RoadmapSchema = new mongoose.Schema({
  accountId: { type: String, required: true },
  name: { type: String, required: true },
  roadmapId: {type:String, require:true},
  nodes: { type: Array, default: [] },
  edges: { type: Array, default: [] }
}, { timestamps: true },{ versionKey: false });

export default mongoose.model("Roadmap", RoadmapSchema);