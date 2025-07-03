import mongoose, { mongo } from 'mongoose'

const commentSchema = new mongoose.Schema({
admin:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},
post:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Post"
},
text:{
    type:String
}
},{timestamps:true})

export const commentModel= mongoose.model("Comment",commentSchema)