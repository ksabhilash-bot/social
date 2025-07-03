import { postModel } from "../Schema/postModel.js";
import { commentModel } from "../Schema/commentModel.js";
import { userModel } from "../Schema/userModel.js";
import cloudinary from "../Config/cloudinary.js";
import formidable from "formidable";
import mongoose from "mongoose";

//addpost
export const addpost=async(req,res)=>{
    try {
        const form=formidable({})
        form.parse(req,async(err,fields,files)=>{
            if(err){
                return res.status(400).json({
                    success:false,
                    message:"error in post"
                })
            }
            const post = new postModel()
            if(fields.text){
                post.text=fields.text
            }
            if(files.media){
                const uploadedImage=await cloudinary.uploader.upload(files.media.filepath,{folder:"Thread_Clone/posts"})
                if(!uploadedImage){
                    return res.status(400).json({
                        success:false,
                        message:"Error in uploading post file"
                    })
                }
                post.media=uploadedImage.secure_url;
                post.public_id=uploadedImage.public_id
            }
            post.admin=req.user._id;
            const newPost = await post.save()
            await userModel.findByIdAndUpdate(req.user._id,{
                $push:{threads:newPost._id}
            },{new:true})
            return res.status(201).json({
                success:true,
                message:"Post created successfully",
                newPost
            })
        })
    } catch (error) {
        console.log("addpost error",error)
        return res.status(500).json({
          message:"error while adding post",
          success:true  
        })
    }
}

//getposts
export const getallpost=async(req,res)=>{
try {
    const {page}=req.query;
    let pageNumber=page;
    if(!page || page === undefined){
        pageNumber=1
    }
    const post = await postModel.find({}).sort({createdAt:-1}).skip((pageNumber-1)*3).limit(3).populate('admin').populate("likes")
    .populate({
        path:"comments",
        populate:{
            path:"admin",
            model:"User"
        }
    });
    res.status(200).json({
        message:"post fetched",
        post,
        success:true
    })
    
} catch (error) {
    console.log("Error in getallpost",error)
    return res.status(500).json({
        success:false,
        message:"Internal server error"
    })
}
}

//deletepost
export const deletepost =async(req,res)=>{
    try {
        const {id}=req.params;
        if(!id){
            return res.status(400).json({
                success:false,
                message:"Id not available to delete"
            })
        }
        const postExists= await postModel.findById(id)
        if(!postExists){
            return res.status(400).json({
                success:false,
                message:"Post not exists to delete"
            })
        }
        const userId= req.user._id.toString();
        const postadminId=postExists.admin._id.toString();
        if(userId !== postadminId){
            return res.status(400).json({
                success:false,
                message:"Not admin of this post"
            })
        }
        if(postExists.media){
            await cloudinary.uploader.destroy(postExists.public_id,(error,result)=>{
                console.log({error,result})
            })
        }
        await commentModel.deleteMany({_id:{$in:postExists.comments}});
        await userModel.updateMany({$or:[{threads:id},{reposts:id},{replies:id}]},
            {
                $pull:{
                    threads:id,
                    reposts:id,
                    replies:id
                }
            },
            {new:true}
        )
        await postModel.findByIdAndDelete(id);
        return res.status(200).json({
            success:true,
            message:"Deleted successfully"
        })
    } catch (error) {
        console.log("Error in deletePProducts",error)
        return res.status(500).json({
            message:"Internal server error",
            success:true
        })
    }
}

//likepost
export const likePost=async(req,res)=>{
    try{
        const {id}=req.params;
        if(!id){
            return res.status(400).json({
                success:false,
                message:"id found to like"
            })
        }
        const post=await postModel.findById(id)
        if(!post){
            return res.status(400).json({
                success:false,
                message:"Post not exist"
            })
        }
        if(post.likes.includes(req.user._id)){
            await postModel.findByIdAndUpdate(id,{$pull:{likes:req.user._id}},{new:true})
            return res.status(200).json({
                success:true,
                message:"Removed like"
            })
        }
        await postModel.findByIdAndUpdate(id,{$push:{likes:req.user._id}},{new:true})
        return res.status(200).json({
                success:true,
                message:"post liked"
            })
    }
    catch(error){
        console.log("Error in likePost controller",error)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

//reposts
export const reposts=async(req,res)=>{
    try {
        const {id}=req.params;
        if(!id){
            return res.status(400).json({
                success:false,
                message:"no id available to repost"
            })
        }
        const post = await postModel.findById(id)
        if(!post){
            return res.status(400).json({
                success:false,
                message:"post not available to repost"
            })
        }
        const newId =  mongoose.Types.ObjectId.createFromHexString(id);
        if(req.user.reposts.includes(newId)){
            return res.status(400).json({
                success:false,
                message:"Already reposted!"
            })
        }
        await userModel.findByIdAndUpdate(req.user._id,{$push:{reposts:post._id}},{new:true})
        return res.status(200).json({
            success:true,
            message:"reposted successfully"
        })

    } catch (error) {
        console.log("error in repost",error)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

//single post fetch
export const singlePost = async(req,res)=>{
    try {
        const {id}=req.params;
        if(!id){
            return res.status(400).json({
                success:false,
                message:"no id available to fetch"
            })
        }
        const post = await postModel.findById(id)
        .populate({
            path:"admin"
        })
        .populate({
            path:"likes"
        })
        .populate({
            path:"comments",
            populate:{
                path:"admin",
            }
        });

        if(!post){
            return res.status(400).json({
                success:false,
                message:"post not available to fetch"
            })
        }
        return res.status(200).json({
            success:true,
            message:"post fetched",
            post
        })
        
    } catch (error) {
        console.log("Error in fetching a post",error)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}