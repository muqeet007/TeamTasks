import mongoose from 'mongoose'



const TeamSchema=mongoose.Schema({
    name: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tasks" }],
})

export default mongoose.model('Teams',TeamSchema)