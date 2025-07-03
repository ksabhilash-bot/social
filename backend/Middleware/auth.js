import { userModel } from "../Schema/userModel.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const auth=async(req,res,next)=>{
    try {
        const token = req.cookies.threadtoken;
        if(!token){
            return res.status(400).json({
                message:"No token"
            })
        }
        const decodeToken=jwt.verify(token,process.env.JWT_SECRET)
        if(!decodeToken){
            return res.status(400).json({
                message:"Error in decoding token"
            })
        }
       const user = await userModel.findById(decodeToken.token)
       .populate("followers")
       .populate("threads")
       .populate("replies")
       .populate("reposts");
       if(!user){
        return res.status(400).json({
            message:"No user found",
            success:false
        })
       }
       req.user=user;
       next()

    } catch (error) {
        console.log("Error in auth",error)
        return res.status(400).json({
            message:"Invalid token"
        })
    }
}