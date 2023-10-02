import express from "express";
import { createBlog, deleteBlog, getAllBlogs, getOneBlog, updateBlog } from "../controllers/blogController.js";

const blogRouter = express.Router();

blogRouter.get("/",getAllBlogs);
blogRouter.get("/:blogId",getOneBlog);
blogRouter.post("/:userId",createBlog);
blogRouter.delete("/:userId/:blogId",deleteBlog);
blogRouter.patch("/:userId/:blogId/update",updateBlog);

export default blogRouter;