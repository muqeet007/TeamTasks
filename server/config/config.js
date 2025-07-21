import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'


export const PORT=process.env.PORT




export const connectDatabase=async()=>
{
    try{
    console.log(process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Database connected successfully.");   
    }
    catch(error)
    {
        throw error
        
    }
}