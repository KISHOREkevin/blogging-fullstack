import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";

export const getAllBlogs = async (req,res)=>{
    let blogs;
    try {
        blogs = await Blog.find();
    } catch (error) {
        console.log(error.message);
    }
    try {
        if(!blogs){
            return res.status(404).json({message:"Blogs not found ..."});
        }
        return res.status(200).json({blogs});

    } catch (error) {
        console.log(error.message);
    }
}

export const getOneBlog = async (req,res)=>{
    let blog;
    let {blogId} = req.params;
    try {
        blog = await Blog.findById(blogId);
    } catch (error) {
        console.log(error.message);
    }
    try {
        if(!blog){
            return res.status(404).json({message:"Blog not found ..."});
        }
        return res.status(200).json({blog});
    } catch (error) {
        console.log(error.message);
    }
}

export const createBlog = async (req,res)=>{
    let {blogtitle,blogcontent} = req.body;
    let {userId} = req.params;
    let user;
    let blog;
  
    user = await User.findById(userId);
   
    try {
        if(!user){
            return res.status(404).json({message:"User not found ..."});
        }
        blog = new Blog({
            blogtitle,
            blogcontent,
            blogusername:user.username,
            bloguserid:user._id
        });
        user.userblogs.push(blog);
       await blog.save();
       await user.save();
       return res.status(201).json({blog});
    } catch (error) {
        console.log(error.message);
    }
  
}

export const updateBlog = async (req,res)=>{
    let {userId,blogId} = req.params;
    let {blogtitle,blogcontent} = req.body;
    let user;
    let blog;
    try {
        user = await User.updateOne({_id:userId,"userblogs._id":blogId},{$set:{"userblogs.$.blogtitle":blogtitle,"userblogs.$.blogcontent":blogcontent}});
        blog = await Blog.findByIdAndUpdate(blogId,{blogtitle,blogcontent});
        return res.status(200).json({blog});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteBlog = async (req,res)=>{
    let {userId,blogId} = req.params;
    let user;
    let blog;
    try {
        user = await User.findByIdAndUpdate(userId,{$pull:{userblogs:{_id:blogId}}});
        blog = await Blog.findByIdAndRemove(blogId);
        return res.status(200).json({message:"Blog deleted successfully ..."});

    } catch (error) {
        console.log(error.message);
    }
}
