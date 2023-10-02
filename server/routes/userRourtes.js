import express from "express";
import { createUser, deleteUser, followUser, getAllUsers, getOneUser, getUserBlog, showFollowers, showFollowings, unfollowUser, userValidator } from "../controllers/userController.js";

const userRouter =  express.Router();

userRouter.get("/",getAllUsers);
userRouter.get("/:userId",getOneUser);
userRouter.get("/:userId/blogs",getUserBlog);
userRouter.post("/",createUser);
userRouter.post("/equals",userValidator);
userRouter.delete("/:userId",deleteUser);
userRouter.post("/:userId/:followerId/follow",followUser);
userRouter.post("/:userId/:followerId/unfollow",unfollowUser);
userRouter.get("/:userId/followers",showFollowers);
userRouter.get("/:userId/followings",showFollowings);
export default userRouter;