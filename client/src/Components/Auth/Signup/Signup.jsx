import React, { useState } from 'react'
import {Box,TextField,FormLabel,Button,Grow} from "@mui/material";
import axios from "axios";
import baseUrl from '../../../apis/links.js';
import {useNavigate} from "react-router-dom";
import "../style.css";
const Signup = () => {
  let navigate = useNavigate();
  // input Tracker
  let [signupData,setSignupData] = useState({
    username:"",
    usermail:"",
    userpassword:""
  })
  let inputHandler= (e)=>{
    let {name,value} = e.target;
    setSignupData((prevInputs)=>{
       return {
          ...prevInputs,
          [name]:value
       }
    })
  }
  //submit handler
  let submitHandler = async (e)=>{
      e.preventDefault();
      axios.post(`${baseUrl}/users`,signupData);
      navigate("/login");

  }
  // styling box
  let boxStyle = { 
    backgroundColor:"#176B87",
    padding:"10px 20px",
    margin:"100px 8%",
    borderRadius:"5px"
  }
  
  return (
    <>
    <Grow in>
      <Box sx={boxStyle}>
          <form className='log-form' onSubmit={submitHandler}  >
              <div className="log-form-element">
                  <FormLabel style={{color:"#EEEEEE"}} htmlFor='username'>Enter your name : </FormLabel><br /><br />
                  <TextField onChange={inputHandler} value={signupData.username} sx={{input:{color:"#EEEEEE"}}} label="Enter name" id='username' name='username' fullWidth required />
              </div>
              <div className="log-form-element">
                  <FormLabel style={{color:"#EEEEEE"}} htmlFor='usermail'>Enter your email:</FormLabel><br /><br />
                  <TextField type='email' onChange={inputHandler} value={signupData.usermail} sx={{input:{color:"#EEEEEE"}}} label="Enter email" id='usermail' name='usermail' fullWidth required/>
              </div>
              <div className="log-form-element">
                <FormLabel style={{color:"#EEEEEE"}} htmlFor='userpassword'>Enter your password : </FormLabel><br /><br />
                <TextField type='password' onChange={inputHandler} value={signupData.userpassword} sx={{input:{color:"#EEEEEE"}}} label="Enter password" id='userpassword' name='userpassword' fullWidth required />
              </div>
              <Button type='submit' variant='contained' style={{marginTop:"20px",backgroundColor:"#64CCC5",color:"black"}} fullWidth >Signup</Button>
          </form>
      </Box>
      </Grow>
    </>
  )
}

export default Signup