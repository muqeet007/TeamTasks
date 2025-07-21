import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name: String,
  email: { type: String, unique: true },
  password: String,
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
})

export default mongoose.model('Users',userSchema)