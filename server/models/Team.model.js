import mongoose from 'mongoose'



const TeamSchema=mongoose.Schema({
    name: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
})

export default Team=mongoose.model('Teams',TeamSchema)