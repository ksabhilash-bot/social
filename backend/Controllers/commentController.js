import { commentModel } from "../Schema/commentModel.js";
import { userModel } from "../Schema/userModel.js";
import { postModel } from "../Schema/postModel.js";
import mongoose from "mongoose";

//add comment
export const addComment=async(req,res)=>{
    try {
        const {id}=req.params;
        const {text}=req.body;
        if(!id){
            return res.status(400).json({
                success:false,
                message:"id not available to add comment"
            })
        }
        if(!text){
            return res.status(400).json({
                success:false,
                message:"comment text not available to add comment"
            })
        }
        const postExists=await postModel.findById(id)
        if(!postExists){
            return res.status(400).json({
                success:false,
                message:"Post not available to comment"
            })
        }
        const comment = new commentModel({
            text,
            admin:req.user._id,
            post:postExists._id
        });
        const newComment = await comment.save()
        await postModel.findByIdAndUpdate(id,{
            $push:{comments:newComment._id}
        },{new:true})
        await userModel.findByIdAndUpdate(req.user._id,{
            $push:{replies:newComment._id}
        },{new:true})
        return res.status(201).json({
            success:true,
            message:"Commented!"
        })
    } catch (error) {
       console.log("not able to comment",error)
       return res.status(500).json({
        success:false,
        message:"Internal server error"
       }) 
    }
}

export const deleteComment=async(req,res)=>{
    try {
        const {id,postId}=req.params;
        if(!id || !postId){
            return res.status(400).json({
                success:false,
                message:"No comment id given to delete"
            })
        }
        const postExists=await postModel.findById(postId)
        const commentExists=await commentModel.findById(id)
        if(!postExists){
            return res.status(400).json({
                success:false,
                message:"Post not available to delete comment"
            })
        }
        if(!commentExists){
            return res.status(400).json({
                success:false,
                message:"NO such comment exists"
            })
        }
        const newId= new mongoose.Types.ObjectId(id);
        if(postExists.comments.includes(newId)){
            const id1=commentExists.admin._id.toString();
            const id2=req.user._id.toString();
            if(id1 !== id2){
                return res.status(400).json({
                    success:false,
                    message:"not authorized to delete this comment"
                })
            }
            await postModel.findByIdAndUpdate(postId,{
                $pull:{comments:id}
            },{new:true})
            await userModel.findByIdAndUpdate(req.user._id,{
                $pull:{replies:id}
            },{new:true})
            await commentModel.findByIdAndDelete(id)
            return res.status(201).json({
                success:true,
                message:"Comment deleted"
            })
        }


    } catch (error) {
        console.log("Error in deleting comment",error)
        return res.status(500).json({
            success:false,
            message:"Internal server Error"
        })
    }
}


//delete comment