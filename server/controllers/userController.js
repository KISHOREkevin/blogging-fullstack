import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req,res)=>{
    let users;
    try {
        users = await User.find();
    } catch (error) {
        console.log(error.message);
    }
    try {
        if(!users){
            return res.status(404).json({message:"Users not found ...."});
        }
        return res.status(200).json({users});
    } catch (error) {
        console.log(error.message);
    }
}
export const getOneUser = async (req,res)=>{
    let {userId}=req.params;
    let user;
    try {
        user = await User.findById(userId);
    } catch (error) {
        console.log(error.message);
    }
    try {
        if(!user){
            return res.status(404).json({message:"User not found ..."});
        }
        return res.status(200).json({user});
    } catch (error) {
        console.log(error.message);
    }
} 
export const createUser = async (req,res)=>{
    let {username,usermail,userpassword,userfollowerscount} = req.body;
    let hashedpassword = bcrypt.hashSync(userpassword,Number(process.env.SALING_ROUND));
    let existinguser;
    let user;
    try {
        user = new User({
            username,
            usermail,
            userpassword:hashedpassword,
            userfollowerscount
        })
        existinguser = await User.findOne({usermail}); 
    } catch (error) {
        console.log(error.message);
    }
    try {
        if(!existinguser){
            await user.save();
            return res.status(201).json({user});
        }
        return res.status(409).json({message:"User with this mail account already found !!!"});
    } catch (error) {
        console.log(error.message);
    }
}

export const userValidator = async (req,res)=>{
    let {usermail,userpassword} = req.body;
    let equals = false;
    let user;
    try {
        user = await User.findOne({usermail});
        equals = bcrypt.compareSync(userpassword,user.userpassword);
    } catch (error) {
        console.log(error.message);
    }
    try {
        if(equals && user){
            return res.status(200).json({user});
        }
        return res.status(404).json({message:"User not found or check your password ..."});
    } catch (error) {
        console.log(error.message);
    }
}

export const getUserBlog = async (req,res)=>{
    let {userId} = req.params;
    let user;
    let blogs;
    try {
        user = await User.findById(userId);
        blogs = user.userblogs;
    } catch (error) {
        console.log(error.message);
    }
    try {
        if(!user){
            return res.status(404).json({message:"User not found ..."});
        }
        return res.status(200).json({blogs});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUser = async (req,res)=>{
    let {userId} = req.params;
    let user;
    try {
        user = await User.findByIdAndRemove(userId);
    } catch (error) {
        console.log(error.message);
    }
    try {
        if(user){
            return res.status(200).json({message:"User Deleted Successfully ..."});
        }
        return res.status(404).json({message:"User not found..."});
    } catch (error) {
        console.log(error.message);
    }
}

export const followUser = async (req,res)=>{
   let {userId} = req.params;
   let {followerId} = req.params;
   let user;
   let follower;
   let existingfollowers ;
   try {
        follower = await User.findById(followerId);
        user = await User.findById(userId);
        existingfollowers = user.userfollowers;
        if(existingfollowers.includes(followerId)){
            return res.status(400).json({message:"Followed Already ..."});
        }
        user.userfollowers.push(follower._id);
        follower.userfollowing.push(user._id);
        user.userfollowerscount = user.userfollowers.length;
        user.save();
        follower.save();
        return res.status(200).json({message:"Followed successfully"});
   } catch (error) {
            console.log(error);
   }
   
}

export const unfollowUser = async (req,res)=>{
    let {userId} = req.params;
    let {followerId} = req.params;
    let user;
    try {
        
        await User.findByIdAndUpdate(userId,{$pull:{userfollowers:followerId}});
        await User.findByIdAndUpdate(followerId,{$pull:{userfollowing:userId}});
        user = await User.findById(userId);
        await User.findByIdAndUpdate(userId,{$set:{userfollowerscount:user.userfollowers.length}})

        return res.status(200).json({message:"Unfollowed successfully...."});
    } catch (error) {
        console.log(error);        
    }
}

export const showFollowers = async (req,res)=>{
    let {userId} = req.params;
    let user;
    let followers;
    try {
        user = await User.findById(userId).populate("userfollowers");
        followers = user.userfollowers;
        let followerscount = user.userfollowerscount;
       
        return res.status(200).json({followers,followerscount});
    } catch (error) {
        console.log(error);
    }
}

export const showFollowings = async (req,res)=>{
    let {userId} = req.params;
    let user;
    let followings;
    let userpopulated;
    let followingpopulated
    try {
        user = await User.findById(userId);
        userpopulated = await User.findById(userId).populate("userfollowing");
        followings = user.userfollowing;
        followingpopulated = userpopulated.userfollowing;
        return res.status(200).json({followings,followingpopulated});
    } catch (error) {
        console.log(error);
    }
}