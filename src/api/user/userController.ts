import { Request,Response } from "express";
import { userSignUpSchema, userSingInSchema } from "../../types/zod";
import { User } from "../../models/userSchema";
import { Keypair } from "@solana/web3.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/config";


export const SignUp=async(req:Request,res:Response):Promise<any>=>{
    try {
        const {email,password}=req.body;
        const parseData=await userSignUpSchema.safeParse({email,password});
        if(!parseData){
            res.json({
                message:"Invalid data"
            });
        }
        const userExist=await User.findOne({email});

        if(userExist){
            res.json({
                message:"User already exist"
            });
        }
        const hashPassword=await bcrypt.hash(password,10);

        const keyPair= new Keypair();

        const newUser=await User.create({
            email,
            password:hashPassword,
            privateKey:keyPair.secretKey.toString(),
            publickey:keyPair.publicKey.toString()
        });

        res.json({
            message:"User created successfully",
            data:newUser
        });
        
    } catch (error) {
        console.log("error",error);
        
    }
}
export const Signin=async(req:Request,res:Response):Promise<any>=>{

    try {

        const {email,password}=req.body;
        const parseData=await userSingInSchema.safeParse({email,password});
        if(!parseData){
            res.json({
                message:"Invalid data"
            });
        }

        const userExist=await User.findOne({email});
        if(!userExist){
            res.json({
                message:"User not found"
            });
            return;
        }
    
        const isMatch=await bcrypt.compare(password,userExist.password);
        if(!isMatch){
            res.json({
                message:"Invalid password"
            });
        }

        const token=await jwt.sign({id:userExist._id},JWT_SECRET);
        res.json({
            message:"User logged in successfully",
            token
        });

        
    } catch (error) {
        console.log("error",error);
        
    }
}


export const Transaction=async(req:Request, res:Response):Promise<any>=>{
    try {
        
    } catch (error) {
        console.log("error",error);
        
    }
}
