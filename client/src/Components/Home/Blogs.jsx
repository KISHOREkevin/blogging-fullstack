import React, { useEffect, useState } from 'react'
import { Box,Grow,Typography } from '@mui/material'
import Blog from "./Blog";

import "./style.css";
import baseUrl from '../../apis/links.js';
import axios from "axios";
const Blogs = () => {
  let [datum,setDatum] = useState([]);
  useEffect(()=>{
    const fetchAllBlogs = async ()=>{
        const response = await axios.get(`${baseUrl}/blogs`);
        const data = await response.data.blogs;
        setDatum(data);
    }

    fetchAllBlogs();
  },[])
  let boxStyle = {
    height:"549px",
    overflowY:"scroll",
    width:"100%",
    "@media (width<800px)":{
      textAlign:"center",
      height:"700px"
    }
  }
  return (
    <>
      <Grow in>
      <Box sx={boxStyle}  className='blog-box'>
            {datum.length === 0 ? <Typography variant='h4' textAlign={"center"} >No blogs found ...</Typography> :
            datum.map((data)=>{
              return <Blog  key={data._id} userId={data.bloguserid}  blogId={data._id} blogtitle={data.blogtitle}  blogusername={data.blogusername} />
            })}
              
        </Box>
      </Grow>

    </>
  )
}

export default Blogs