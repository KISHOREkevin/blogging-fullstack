import React from 'react'
import { Box,Typography } from '@mui/material'

const Follower = ({followerId,followername,followermail}) => {
  let boxStyle = {
    backgroundColor:"#64CCC5",
    color:"#000",
    padding:"10px",
    borderRadius:"5px",
    mb:"3px"
  
}
  return (
    <Box sx={boxStyle}>
      <a href={`/user/${followerId}`} style={{color:"#000"}}><Typography variant='body1'>{`@${followername}`}</Typography></a>
      <a href={`mailto:${followermail}`} target='_blank' rel='noreferrer' style={{color:"#000"}}><Typography variant='body2'>{followermail}</Typography></a>
    </Box>
  )
}

export default Follower