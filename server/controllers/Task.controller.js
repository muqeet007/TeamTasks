import mongoose from "mongoose";
import Task from "../models/Task.model.js"; // adjust path if needed

export const getTasksByTeam = async (req, res) => {
  const { teamId } = req.params;

  // 1. Validate teamId format
  if (!mongoose.Types.ObjectId.isValid(teamId)) {
    return res.status(400).json({
      message: "Enter a valid team ID in correct format",
    });
  }

  try {
    // 2. Find tasks associated with this team
    const tasks = await Task.find({ team: teamId }).populate("team","name").populate("assignedTo","name");

    // 3. If no tasks found
    if (!tasks || tasks.length === 0) {
      return res.status(200).json({
        message: "No tasks found for this team.",
        tasks: [],
      });
    }

    // 4. Return all tasks
    return res.status(200).json({ tasks });
    
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
};

export const createTaskInTeam = async (req, res) => {
    const { teamId } = req.params;
    const { title, description, assignedTo } = req.body;
  
    // Validate teamId and assignedTo as ObjectId
    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return res.status(400).json({ message: "Invalid team ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
      return res.status(400).json({ message: "Invalid user ID for assignedTo" });
    }
  
    try {
      const task = new Task({
        title,
        description,
        team: teamId,
        assignedTo,
      });
      await task.save();
      return res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
      return res.status(500).json({ message: error.message || "Something went wrong" });
    }
  };

  
  export const updateTaskInTeam = async (req, res) => {
    const { teamId, taskId } = req.params;
    const { title, description, status, assignedTo } = req.body;
  
    // Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(teamId) ||
      !mongoose.Types.ObjectId.isValid(taskId)
    ) {
      return res.status(400).json({ message: "Invalid team or task ID" });
    }
  
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        {
          ...(title && { title }),
          ...(description && { description }),
          ...(status && { status }),
          ...(assignedTo && { assignedTo }),
        },
        { new: true }
      ).populate("assignedTo","name").populate("team","name")
  
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found." });
      }
  
      return res.status(200).json({
        message: "Task updated successfully.",
        task: updatedTask,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Something went wrong",
      });
    }
  };
  

  export const deleteTaskInTeam = async (req, res) => {
    const { teamId, taskId } = req.params;
  
    // Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(teamId) ||
      !mongoose.Types.ObjectId.isValid(taskId)
    ) {
      return res.status(400).json({ message: "Invalid team or task ID" });
    }
  
    try {
      // Check if the task exists in the given team
      const task = await Task.findOne({ team: teamId, _id: taskId });
  
      if (!task) {
        return res.status(404).json({
          message: "Task not found in the specified team",
        });
      }
  
      // Delete the task
      await Task.findByIdAndDelete(taskId);
  
      return res.status(200).json({
        message: "Task deleted successfully from the team",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Something went wrong",
      });
    }
  };
  

export const searchTasksInTeam=async(req,res)=>
{
    const {teamId}=req.params

    const {query}=req.query

    if(!mongoose.Types.ObjectId.isValid(teamId))
    {
        return res.status(400).json({
            message:"Enter the team ID in correct format"
        })
    }
    try{
    const task=await Task.find({
        team:teamId,
        $or:[
            {title:{$regex:query,$options:"i"}},
            {status:{$regex:query,$options:"i"}}
        ]
    }).populate("assignedTo").populate("team")

    if (task.length === 0 && !task)
    {
        return res.status(404).json({message:"No such task found"})
    }

    return res.status(200).json({task:task})
}
catch(error)
{
    res.status(500).json({message:error.message || "Something went wrong"})
}
}

//  //  Additional manual filter for assignedTo.name
//  const filteredTasks = tasks.filter(task =>
//     task.assignedTo?.name?.toLowerCase().includes(query.toLowerCase())
//     || task.title.toLowerCase().includes(query.toLowerCase())
//     || task.status.toLowerCase().includes(query.toLowerCase())
//   );