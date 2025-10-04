import mongoose from "mongoose";

const RoadmapSchema = new mongoose.Schema({
  accountId: { type: String, required: true },
  name: { type: String, required: true },
  roadmapId: {type:String, required:true},
  nodes: { type: Array, default: [] },
// <<<<<<< HEAD
//   edges: { type: Array, default: [] }
// }, {
//   timestamps: true,
//   versionKey: false
// });
// =======
  edges: { type: Array, default: [] },
  id:{type:String,required:true}
}, { timestamps: true },{ versionKey: false });

export default mongoose.model("Roadmap", RoadmapSchema);