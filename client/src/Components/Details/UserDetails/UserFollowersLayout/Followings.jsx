import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import Following from "./Following";
import "../../style.css"
import axios from "axios";
import baseUrl from "../../../../apis/links.js";
import {useParams} from "react-router-dom";

const Followings = () => {
  let {userId} = useParams();
  let [datum,setDatum] = useState([]);
  
  let boxStyle = {
    
    backgroundColor:"#176B87",
    color:"#EEEEEE",
    mt:"10px",
    padding:"1% 2%",
    width:"33%",
    height:"470px",
    float:"right",
    marginLeft:"10px",
    overflowY:"scroll",
    borderRadius:"5px",
    "@media (width<800px)":{
      width:"99%",
      display:"block",
      float:"none",
      marginLeft:"0",
      padding:"1%",
      mt:"10px"
  }
  }
  useEffect(()=>{
    const fetchAllFollowers = async ()=>{
      let response = await axios.get(`${baseUrl}/users/${userId}/followings`);
      let data = await response.data;
      setDatum(data.followingpopulated);
     
    }

    fetchAllFollowers();
  },[userId]);

  
  return (
    <Box sx={boxStyle} className="blog-box"> 
      <Typography variant='body1' textAlign={"center"} marginBottom={"5px"}>{`Followings`}</Typography>
        {datum.length===0 ? 
          <Typography variant='h6' textAlign={"center"}>No followings found ...</Typography> : 
          datum.map((data)=>{
          return <Following key={data._id} followerId={data._id} followername={data.username} followermail={data.usermail} />
        })}
    </Box>
  )
}

export default Followings