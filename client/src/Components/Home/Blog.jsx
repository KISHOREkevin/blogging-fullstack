import React from 'react'
import { Box } from '@mui/material'
import "./style.css";
const Blog = ({blogId,blogusername,blogtitle,userId}) => {
    let boxStyle={
        backgroundColor:"#176B87",
        color:"#64CCC5",
        padding:"10px",
        margin:"5px 2px",
        borderRadius:"5px",
        width:"313px",
        
        display:"inline-block",
        "@media (width<800px)":{
            width:"300px"
        },
        cursor:"pointer",
        overflowY:"hidden"
    }
    
  return (
    <Box sx={boxStyle} className="blog" >
        <a href={`/user/${userId}`}><p className='blog-user'>{"@"+blogusername}</p></a>
        <a href={`/blog/${blogId}`}><h2 className='blog-title'>{blogtitle}</h2></a>
        
        
        
    </Box>
  )
}

export default Blog