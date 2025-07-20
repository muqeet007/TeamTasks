import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

export const PORT=process.env.PORT

export const connectDatabase=async()=>
{
    try{
        await mongoose.connect(process.env.MONGO_URL)
    console.log("Database connected successfully.");   
    }
    catch(error)
    {
        throw error
        
    }
}