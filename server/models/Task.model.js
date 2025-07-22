import mongoose from "mongoose";

const taskSchema=mongoose.Schema({
    title: String,
  description: String,
  status: { type: String, enum: ["pending", "done", "late"], default: "pending" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Teams" },
})

export default mongoose.model('Tasks',taskSchema)