import mongoose, { mongo } from "mongoose";
import User from "../models/User.model.js";


export const getUsersByTeam = async (req, res) => {
  const { teamId } = req.params;

  // Check for valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(teamId)) {
    return res.status(400).json({
      message: "Enter a valid team ID in correct format",
    });
  }

  try {
    // Find users with matching team ID
    const users = await User.find({ team: teamId });

    if (!users || users.length === 0) {
      return res.status(200).json({
        message: "No users are in this team.",
        users: [],
      });
    }

    // Return users
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
};


export const createUserInTeam=async(req,res)=>
{
    const {teamId}=req.params
    const {name,email}=req.body

    // Check for valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(teamId)) {
    return res.status(400).json({
      message: "Enter a valid team ID in correct format",
    });
  }

  const user=new User({name,email,team:teamId})

  try
  {
    await user.save()
  
  
  return res.status(201).json({
    message:"User has been created successfully."
  })
    }

    catch (error) {
        return res.status(500).json({
          message: error.message || "Something went wrong",
        });
      }
}

export const updateUserInTeam = async (req, res) => {
  const { teamId, userId } = req.params;
  const { name, email } = req.body;

  // Validate ObjectIds
  if (
    !mongoose.Types.ObjectId.isValid(teamId) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    return res.status(400).json({
      message: "Invalid Team or User ID",
    });
  }

  try {
    // Strict check: does this user belong to the given team?
    const user = await User.findOne({ _id: userId, team: teamId });
    if (!user) {
      return res.status(404).json({
        message: "User not found in the specified team",
      });
    }

    // Perform update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(name && { name }),
        ...(email && { email }),
      },
      { new: true }
    );

    return res.status(200).json({
      message: "User updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
};


export const deleteUserInTeam = async (req, res) => {
    const { teamId, userId } = req.params;
  
    if (
      !mongoose.Types.ObjectId.isValid(teamId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({
        message: "Invalid Team or User ID",
      });
    }
  
    try {
      // Ensure user belongs to the team
      const user = await User.findOne({ _id: userId, team: teamId });
      if (!user) {
        return res.status(404).json({
          message: "User not found in the specified team",
        });
      }
  
      await User.findByIdAndDelete(userId);
  
      return res.status(200).json({
        message: "User deleted successfully from the team",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Something went wrong",
      });
    }
  };

  
  export const searchUsersInTeam = async (req, res) => {
    const { teamId } = req.params;
    const { query } = req.query; // e.g., ?query=ali
  
    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return res.status(400).json({ message: "Invalid Team ID" });
    }
  
    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }
  
    try {
      const users = await User.find({
        team: teamId,
        $or: [
          { name: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
        ],
      });
  
      if (users.length === 0) {
        return res.status(404).json({ message: "No users found matching search" });
      }
  
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Something went wrong",
      });
    }
  };
  