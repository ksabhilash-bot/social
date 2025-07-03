import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
admin:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},
text:{
    type:String
},
media:{
    type:String
},
public_id:{
    type:String
},
likes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
}],
comments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Comment"
}]
},{timestamps:true})

export const postModel = mongoose.model("Post",postSchema)