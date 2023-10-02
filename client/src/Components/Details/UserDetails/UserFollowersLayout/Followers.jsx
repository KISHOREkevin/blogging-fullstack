import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import Follower from './Follower';
import "../../style.css"
import axios from "axios";
import baseUrl from "../../../../apis/links.js";
import {useParams} from "react-router-dom";

const Followers = () => {
  let {userId} = useParams();
  let [datum,setDatum] = useState([]);
  let [followercounter,setFollowercounter] = useState(0);
  let boxStyle = {
    
    backgroundColor:"#176B87",
    color:"#EEEEEE",
    mt:"10px",
    padding:"1% 2%",
    width:"30%",
    height:"470px",
    float:"right",
    overflowY:"scroll",
    borderRadius:"5px",
    "@media (width<800px)":{
      width:"99%",
      display:"block",
      float:"none",
      padding:"1%",
      mt:"10px"
  }
  }
  useEffect(()=>{
    const fetchAllFollowers = async ()=>{
      let response = await axios.get(`${baseUrl}/users/${userId}/followers`);
      let data = await response.data;
      setDatum(data.followers);
      setFollowercounter(data.followerscount);
    }

    fetchAllFollowers();
  },[userId]);

  
  return (
    <Box sx={boxStyle} className="blog-box"> 
      <Typography variant='body1' textAlign={"center"} marginBottom={"5px"}>{`Followers (${followercounter})`}</Typography>
        {datum.length===0 ? 
          <Typography variant='h6' textAlign={"center"}>No followers found ...</Typography> : 
          datum.map((data)=>{
          return <Follower key={data._id} followerId={data._id} followername={data.username} followermail={data.usermail} />
        })}
    </Box>
  )
}

export default Followers