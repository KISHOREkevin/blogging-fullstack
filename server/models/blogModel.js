import mongoose from "mongoose";

export const blogSchema = new mongoose.Schema({
    blogtitle:String,
    blogcontent:String,
    blogusername:String,
    bloguserid:String
})
const Blog = mongoose.model("Blog",blogSchema);

export default Blog;