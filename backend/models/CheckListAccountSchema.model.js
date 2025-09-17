import mongoose from "mongoose";

const CheckListAccountSchema = new mongoose.Schema({
  accountId: { type: String, required: true },
  roadmapId: { type: String, required: true },
  checklistId: { type: String, required: true },
  itemsCheckList: { type: Array, default: [] },
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model("Check_List_Account", CheckListAccountSchema);