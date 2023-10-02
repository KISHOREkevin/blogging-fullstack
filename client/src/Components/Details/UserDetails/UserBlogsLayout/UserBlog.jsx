import React from 'react'
import { Box, Typography } from '@mui/material'
const UserBlog = ({blogtitle,blogId}) => {
    let boxStyle = {
        backgroundColor:"#64CCC5",
        color:"#000",
        padding:"2%",
        width:"auto",
        borderRadius:"5px",
        mb:"3px"
      
    }
  return (
    <Box sx={boxStyle}>
        <a href={`/blog/${blogId}`} style={{color:"#000"}}><Typography variant='body1'>{blogtitle}</Typography></a>
    </Box>
  )
}

export default UserBlog