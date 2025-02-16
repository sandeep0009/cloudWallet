import mongoose from "mongoose";
import { DB_URI } from "../config/config";


export const connectDb=async()=>{
    try {
        const conn=await mongoose.connect(DB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("error",error);

    }   
}