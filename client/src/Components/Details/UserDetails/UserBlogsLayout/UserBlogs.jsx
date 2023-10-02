import React, { useEffect, useState } from 'react'
import UserBlog from './UserBlog'
import { Box, Typography } from '@mui/material';
import axios from "axios";
import baseUrl from "../../../../apis/links.js";
import "../../style.css";
import { useParams } from 'react-router-dom';
const UserBlogs = () => {
  let {userId} = useParams();
  let [datum,setDatum] = useState([]);
  useEffect(()=>{
    const fetchUserBlogs = async ()=>{
        let response = await axios.get(`${baseUrl}/users/${userId}/blogs`);
        let data = await response.data.blogs;
        setDatum(data);
    }

    fetchUserBlogs();
  },[userId]);
  let boxStyle = {
    backgroundColor:"#176B87",
    color:"#EEEEEE",
    padding:"1%",
    borderRadius:"5px",
    mt:"10px",
    width:"25%",
    display:"inline-block",
    height:"470px",
    overflowY:"scroll",
    "@media (width<800px)":{
        width:"99%",
        display:"block"
    }
  }
  
  return (
    
    <Box sx={boxStyle} className="blog-box">
      <Typography variant='body1' textAlign={"center"} marginBottom={"5px"}>Blogs</Typography>
          {datum.length === 0 ? <Typography variant='h6' textAlign={"center"}>No Blogs Added ...</Typography> : datum.map((data)=>{
            return <UserBlog key={data._id} blogId={data._id} blogtitle={data.blogtitle} />
          })}
    </Box>
  )
}

export default UserBlogs