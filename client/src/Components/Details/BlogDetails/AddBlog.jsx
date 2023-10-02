import React, { useState } from 'react'
import {Box,Grow,FormLabel,TextField,Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from 'axios';
import baseUrl from '../../../apis/links.js';
import "../style.css"

const AddBlog = () => {
  // input trackers
  let [blogInputs,setBlogInputs] = useState({
    blogtitle:"",
    blogcontent:""
  });
  
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
//submit handlers
let navigate = useNavigate();
let submitHandler = async(e)=>{
    e.preventDefault();
    let userId = localStorage.getItem("userid");
    await axios.post(`${baseUrl}/blogs/${userId}/`,blogInputs);
    navigate("/");
}
  return (
    <>
      <Grow in>
      <Box sx={boxStyle}>
          <form className='blog-form' onSubmit={submitHandler}>
              
              <div className="blog-form-element">
                  <FormLabel style={{color:"#EEEEEE"}} htmlFor='blogtitle'>Enter blog title:</FormLabel><br /><br />
                  <TextField onChange={inputHandler} sx={{input:{color:"#EEEEEE"}}} label="Blog title" id='blogtitle' name='blogtitle' fullWidth required/>
              </div>
              <ReactQuill theme='snow'  value={blogInputs.blogcontent} onChange={(newValue)=>setBlogInputs((prevValue)=>{return {...prevValue,blogcontent:newValue}})} style={{backgroundColor:"white",color:"#000"}}  />
              <Button type='submit' variant='contained' style={{marginTop:"20px",backgroundColor:"#64CCC5",color:"black"}} fullWidth >Publish</Button>
            
          </form>
      </Box>
      </Grow>
    </>
  )
}

export default AddBlog