import React, { useEffect, useState } from 'react';
import {Box,Typography} from "@mui/material";
import axios from "axios";
import baseUrl from '../../../apis/links';
import { useParams } from 'react-router-dom';
const UserName = () => {
  let {userId} = useParams();
  let [datum,setDatum] = useState({
    username:"",
    usermail:""
  });
  let boxStyle = {
    backgroundColor:"#176B87",
    color:"#EEEEEE",
    padding:"30px",
    borderRadius:"5px"
  }
  useEffect(()=>{
    const fetchUserData = async()=>{
        let response = await axios.get(`${baseUrl}/users/${userId}`);
        let data = await response.data.user;
        setDatum({username:data.username,usermail:data.usermail});
    }

    fetchUserData();
  },[userId]);
  return (
      <Box sx={boxStyle}>
          <Typography variant='h3' >{datum.username}</Typography>
          <a href={`mailto:${datum.usermail}`} target='_blank' rel="noreferrer" style={{color:"#EEEEEE"}}><Typography variant='h6'>{datum.usermail}</Typography></a>
      </Box>
  )
}

export default UserName