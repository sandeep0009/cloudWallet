import { Request,Response } from "express";
import { userSignUpSchema, userSingInSchema } from "../../types/zod";
import { User } from "../../models/userSchema";
import { Keypair } from "@solana/web3.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/config";
import { Connection,Transaction } from "@solana/web3.js";
import b58 from "bs58";



const connection=new Connection("https://api.devnet.solana.com");
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
            data:newUser.publickey
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


export const Transac=async(req:Request, res:Response):Promise<any>=>{
    try {
        const serialTrx=req.body.signature;
        const tx=await Transaction.from(Buffer.from(serialTrx));
        const keyPair=Keypair.fromSecretKey(b58.decode(userExist.privateKey));
        const {blockhash}=await connection.getRecentBlockhash();
        tx.recentBlockhash=blockhash;
        tx.feePayer=keyPair.publicKey;

        tx.sign(keyPair);
        const signature = await connection.sendTransaction(tx, [keyPair])
    
    
        res.json({
            message: "transacion",
            signature

        })

        
    } catch (error) {
        console.log("error",error);
        
    }
}
