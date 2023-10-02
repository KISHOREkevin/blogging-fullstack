import React, { useEffect, useState } from 'react'
import {Box,Grow,FormLabel,TextField,Button} from "@mui/material";
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import axios from 'axios';
import baseUrl from '../../../apis/links.js';
import "../style.css"
import { useNavigate, useParams } from 'react-router-dom';
const UpdateBlog = () => {
  //input trackers
  let {blogId} = useParams();
  let [blogInputs,setBlogInputs] = useState({
    blogtitle:"",
    blogcontent:""
  })

  useEffect(()=>{
    const fetchBlogInputs = async ()=>{
        let response = await axios.get(`${baseUrl}/blogs/${blogId}`);
        let data = response.data.blog;
        setBlogInputs({blogtitle:data.blogtitle,blogcontent:data.blogcontent});
    }
    fetchBlogInputs();
  },[blogId]);

  let inputHandler = (e)=>{
    let {name,value} = e.target;
    setBlogInputs((prevInputs)=>{
      return{
        ...prevInputs,
        [name]:value
      }
    })
  }
  let boxStyle = {
    backgroundColor:"#176B87",
    color:"#64CCC5",
    padding:"50px",
    margin: "5% 2%",
    borderRadius:"5px"
}
// submit handlers
let navigate = useNavigate();
let submitHandler = async (e)=>{
  
  e.preventDefault();
  let userId = localStorage.getItem("userid");
  await axios.patch(`${baseUrl}/blogs/${userId}/${blogId}/update`,blogInputs);
  navigate("/");
}

  return (
    <>
      <Grow in>
      <Box sx={boxStyle}>
          <form className='blog-form' onSubmit={submitHandler} >
              
              <div className="blog-form-element">
                  <FormLabel style={{color:"#EEEEEE"}} htmlFor='blogtitle'>Enter blog title:</FormLabel><br /><br />
                  <TextField onChange={inputHandler} value={blogInputs.blogtitle} sx={{input:{color:"#EEEEEE"}}} label="Blog title" id='blogtitle' name='blogtitle' fullWidth required/>
              </div>
              <ReactQuill theme='snow'  value={blogInputs.blogcontent} onChange={(newValue)=>setBlogInputs((prevValue)=>{return {...prevValue,blogcontent:newValue}})} style={{backgroundColor:"white",color:"#000"}}  />
              <Button type='submit' variant='contained' style={{marginTop:"20px",backgroundColor:"#64CCC5",color:"black"}} fullWidth >Update & Publish</Button>
            
          </form>
      </Box>
      </Grow>
    </>
  )
}

export default UpdateBlog