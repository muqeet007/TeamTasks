import mongoose, { mongo } from "mongoose";

const taskSchema=mongoose.connect({
    title: String,
  description: String,
  status: { type: String, enum: ["pending", "done", "late"], default: "pending" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
})

export default Task=mongoose.model('Tasks',taskSchema)