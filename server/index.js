import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRourtes.js";
import blogRouter from "./routes/blogRoutes.js";
import cors from "cors";
import "dotenv/config.js";
const app = express();
mongoose.connect(process.env.MONGO_URL)
.then(()=>app.listen(process.env.PORT,()=>console.log("Database and server are started...")));
app.use(cors());
app.use(express.json());
app.use("/api/users",userRouter);
app.use("/api/blogs",blogRouter);