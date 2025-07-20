import mongoose from 'mongoose'
import Team from '../models/Team.model.js'

export const getAllTeams=async(req,res)=>
{
    try
    {
        const teams=await Team.find()

    if (!teams || teams.length === 0) 
    {
        return res.status(200)
        .json
        
        ({
            message:"No teams have been created yet."
        })
    }

    else
    {
        return res.status(200)
        .json
        ({
            teams //using shorthand property.
        })
    }
    }

    catch(error)
    {
        return res.status(500)
        .json
        ({
            message:error.message || `Something went wrong .`
        })
    }
}


export const getTeamById=async(req,res)=>
{   
    const {id}=req.params

    try
    {
        const team=await Team.findById(id)

        if (!team)
        {
            return res.status(404)
            .json({
                message:"No such team exists",
            })
        }

        return res.status(200)
        .json({
            team  //using shorthand property
        })
    }

    catch(error)
    {
        return res.status(500)
        .json
        ({
            message:error.message || `Something went wrong .`
        })
    }
}


export const createTeam=async (req,res)=>
{
    try{
    const {name}=req.body

    const teaminstance=new Team({name,users:[],tasks:[]})

    await teaminstance.save()

    return res.status(200)
    .json(
        {
            message:"Team has been created successfully",
            team:teaminstance
        }
    )
    }

    catch(error)
    {
        return res.status(500)
        .json
        ({
            message:error.message || `Something went wrong .`
        })
    }
}


export const updateTeam=async(req,res)=>
{
    const {id}=req.params

    if (!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({ message: "Invalid team ID format." })
    }

    const {name}=req.body

    try
    {
        const updatedTeam = await Team.findByIdAndUpdate(
            id,
            { 
              ...(name && { name }), },
              { new: true } // Return the updated document
            );

            if (!updatedTeam) {
                return res.status(404).json({ message: "Team not found." });
              }
          
              return res.status(200).json({
                message: "Team updated successfully.",
                team: updatedTeam,
              });
    }

    catch(error)
    {
        return res.status(500).json({
            message: error.message || "Something went wrong.",
          });
    }


}

export const deleteTeam=async(req,res)=>
{
    const {id}=req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({message:"Invalid team ID format."})

        try {
            const deletedTeam = await Team.findByIdAndDelete(id);
        
            if (!deletedTeam) {
              return res.status(404).json({ message: "Team not found." });
            }
        
            return res.status(200).json({
              message: "Team deleted successfully.",
            });
          } catch (error) {
            return res.status(500).json({
              message: error.message || "Something went wrong.",
            });
          }
};
