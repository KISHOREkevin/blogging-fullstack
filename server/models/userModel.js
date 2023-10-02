import mongoose from "mongoose";
import { blogSchema } from "./blogModel.js";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    usermail:{
        type:String,
        required:true
    },
    userpassword:{
        type:String,
        required:true
    },
    userfollowerscount:{
        type:Number,
        default:0
    },
    userfollowers:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User"
    },
    userfollowing:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User"
    },
    userblogs:{
        type:[blogSchema]
    }
    
})

const User = mongoose.model("User",userSchema);
export default User;