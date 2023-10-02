import React, { useEffect, useState } from 'react';

import { NavLink, useNavigate, useParams} from "react-router-dom";
import {Box,Grow,Typography,Button,Tooltip} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import "../style.css";
import axios from "axios";
import baseUrl from "../../../apis/links.js";

const BlogDetails = () => {
    let {blogId} = useParams();
    let navigate = useNavigate();
    let [datum,setDatum] = useState([]);
    let [followings,setFollowings] = useState([]);
    let boxStyle = {
        backgroundColor:"#176B87",
        color:"#64CCC5",
        padding:"50px",
        margin: "5% 2%",
        borderRadius:"5px"
    }

    useEffect(()=>{
        const fetchOneBlog = async()=>{
            let response = await axios.get(`${baseUrl}/blogs/${blogId}`);
            let data = await response.data.blog;
            setDatum(data);
        
        }
        
        const fetchAllFollowings = async ()=>{
            let userId = localStorage.getItem("userid");
            let response = await axios.get(`${baseUrl}/users/${userId}/followings`);
            let data = await response.data.followings;
            setFollowings(data);
        }
        fetchOneBlog();
        fetchAllFollowings();
        },[blogId]);

    let deleteButtonHandler = async()=>{
        let userId = localStorage.getItem("userid");
        await axios.delete(`${baseUrl}/blogs/${userId}/${blogId}`);
        navigate("/");
    }
    let followButtonHandler = async()=>{
        let followerId = localStorage.getItem("userid");
        await axios.post(`${baseUrl}/users/${datum.bloguserid}/${followerId}/follow`);
        window.location.reload(false);
    }
    let unfollowButtonHandler = async ()=>{
        let followerId = localStorage.getItem("userid");
        await axios.post(`${baseUrl}/users/${datum.bloguserid}/${followerId}/unfollow`);
        window.location.reload(false);
    }
    
  return (
    <>  
    
        <Grow in>
            <Box sx={boxStyle}>
                <form>
                <Typography variant='h4' sx={{display:"inline-block"}}>{datum.blogtitle}</Typography>
               <br />
                <Typography variant='h6'>{`By ${datum && datum.blogusername}`}</Typography>
                <div style={{backgroundColor:"white",color:"black",padding:"2%",margin:"1%",borderRadius:"5px"}} dangerouslySetInnerHTML={{__html:datum.blogcontent}} />
                <div className="blog-buttons">
               {datum.bloguserid === localStorage.getItem("userid") ? 
                    (
                        <>
                            <Tooltip title={"Update"}>
                                <Button LinkComponent={NavLink} to={`/blog/${blogId}/update`} variant="contained" style={{backgroundColor:"#64CCC5",color:"black",marginRight:"3px"}} ><EditIcon /></Button>
                                </Tooltip>
                                <Tooltip title={"Delete"}>
                                <Button  variant='contained' style={{backgroundColor:"#64CCC5",color:"black",marginRight:"3px"}} onClick={deleteButtonHandler}><DeleteIcon /></Button>
                            </Tooltip>
                        </>
                    ) : 
                    (
                        localStorage.length === 0 ? <Typography variant='body1'>Login or signup to follow this user ...</Typography> :
                        (   
                            followings.includes(datum.bloguserid) ? 
                            (
                                <Tooltip title={"Unfollow"}>
                                    <Button  variant='contained' onClick={unfollowButtonHandler} style={{backgroundColor:"#64CCC5",color:"black",marginRight:"3px"}}><PersonRemoveIcon /></Button>
                                </Tooltip>
                            ) :

                            (
                                <Tooltip title={"Follow"}>
                                    <Button    variant='contained' onClick={followButtonHandler} style={{backgroundColor:"#64CCC5",color:"black",marginRight:"3px"}}><PersonAddAlt1Icon /></Button>
                                </Tooltip>
                            )
                        )
                    )
                    }
                    </div>
                </form>
            </Box>
        </Grow>
    </>
  )
}

export default BlogDetails