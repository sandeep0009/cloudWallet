import { Document,model,Schema } from "mongoose";


export interface IUser extends Document{
    email:string;
    password:string;
    privateKey:string;
    publickey:string;
}


const userSchema=new Schema<IUser>({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    privateKey:{
        type:String,
        required:true
    },
    publickey:{
        type:String,
        required:true
    }
},{timestamps:true});

export const User=model<IUser>("User",userSchema);