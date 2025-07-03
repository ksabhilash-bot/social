import { userModel } from "../Schema/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import formidable from "formidable";
import cloudinary from "../Config/cloudinary.js"
dotenv.config();

//signin
export const signin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields",
      });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      return res.status(400).json({
        success: false,
        message: "Error in hashing password",
      });
    }
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });
    const data = await newUser.save();
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "Error in saving user",
      });
    }
    const accessToken = jwt.sign({ token: data._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    if (!accessToken) {
      return res.status(400).json({
        success: false,
        message: "error in generating token",
      });
    }

    res
      .cookie("threadtoken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite:"strict",
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({
        success: true,
        message: "Registered successfully",
      });
  } catch (error) {
    console.log("Error in signin", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all credentials",
      });
    }
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist",
      });
    }
    const decodePassword = await bcrypt.compare(password, user.password);
    if (!decodePassword) {
      return res.status(404).json({
        success: false,
        message: "Wrong credentials",
      });
    }
    const userObj = user.toObject();
    delete userObj.password;
    const accessToken = jwt.sign(
      { token: userObj._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res
      .status(200)
      .cookie("threadtoken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        message: "login successfully",
        data: userObj,
      });
  } catch (error) {
    console.log("Error in login");
    return res.status(500).json({
      success: false,
      message: "Error in login",
    });
  }
};

//userdetails
export const userDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Error occured in userdetails",
      });
    }
    const user = await userModel
      .findById(id)
      .populate("followers")
      .populate({
        path: "threads",
        populate: [{ path: "likes" }, { path: "comments" }, { path: "admin" }],
      }).populate({path:"replies",populate:{path:"admin"}})
      .populate({path:"reposts",populate:[{path:"likes"},{path:"comments"},{path:"admin"}]});
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      user
    });
    
  } catch (error) {
    console.log("Error in userDetails", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


//follow or unfollow
export const followUser=async(req,res)=>{
try {
  
  const {id}=req.params;
  if(!id){
    return res.status(400).json({
      success:false,
      message:"user id required to follow"
    })
  }
  const existUser = await userModel.findById(id)
  if(!existUser){
    return res.status(404).json({
      success:false,
      message:"User doesn't exists"
    })
  }
  if(existUser.followers.includes(req.user._id)){
    await userModel.findByIdAndUpdate(existUser._id,{
      $pull:{followers:req.user._id}
    },{new:true})
    return res.status(201).json({
      message:`Unfollowed user ${existUser.username}`
    })
  }
  await userModel.findByIdAndUpdate(existUser._id,{
      $push:{followers:req.user._id}
    },{new:true})
    return res.status(201).json({
      message:`followed user ${existUser.username}`
    })
  

  
} catch (error) {
  console.log("Error in followUser",error)
  return res.status(500).json({
    message:"Internal server error"
  })
}
}

//update
export const updateUser=async(req,res)=>{
  try {
    const userExists = await userModel.findById(req.user._id)
    if(!userExists){
      return res.status(404).json({
        success:false,
        message:"User not found"
      })
    }
    const form = formidable({})
    form.parse(req,async(err,fields,files)=>{
      if(err){
        return res.status(400).json({
          message:"Error in formidable",
          error:err
        })
      }
      if(fields.text){
        await userModel.findByIdAndUpdate(req.user._id,{bio:fields.text},{new:true})
      }
      if(files.media){
        if(userExists.public_id){
          await cloudinary.uploader.destroy(userExists.public_id,(error,result)=>{
            console.log(error,result)
          })
        }
        const uploadedimage=await cloudinary.uploader.upload(files.media.filepath,{folder:'Thread_Clone/profiles'})
        if(!uploadedimage){
          return res.status(400).json({
            success:false,
            message:"not able to update profile pic"
          })
        }
        await userModel.findByIdAndUpdate(req.user._id,{profilepic:uploadedimage.secure_url,public_id:uploadedimage.public_id},{new:true})
      }
      return res.status(201).json({
      message:"upldated successfully",
      success:true
    });
    })
    
  } catch (error) {
    console.log("Error in updateProfile",error)
    return res.status(500).json({
      message:"Internal server error"
    })
  }
}

//search
export const searchUser = async(req,res)=>{
  try {
    const {query}=req.params;
    const users=await userModel.find({$or:[
      {
        username:{$regex:query,$options:"i"}
      },
      {
        email:{$regex:query,$options:"i"}
      }
    ]})
    return res.status(200).json({
      message:"Searched users",
      users
    })
  } catch (error) {
    console.log("Error in search user",error)
    return res.status(500).json({
      message:"Internal server error",
      success:false
    })
  }
}

//logout
export const logout = async(req,res)=>{
  try {
    return res.status(200).cookie("threadtoken","",{
      maxAge:0,
      httpOnly:true,
      sameSite:"strict",
      secure: process.env.NODE_ENV === "production",
    }).json({
      success:true,
      message:"Logout Successfull"
    })
    
  } catch (error) {
    console.log("Error while logout",error)
    return res.status(500).json({
      message:"Internal server error",
      success:false,
    })
  }
}

//myinfo
export const myinfo=async(req,res)=>{
  try {
    res.status(200).json({
      me:req.user
    })
  } catch (error) {
    console.log("Error in myinfo",error)
    return res.status(500).json({
      message:"Internal server error",
      success:true
    })
  }
}