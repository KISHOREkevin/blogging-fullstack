import React, { useState } from 'react'
import {Box,TextField,FormLabel,Button,Grow,Typography} from "@mui/material";
import axios from "axios";
import baseUrl from '../../../apis/links.js';
import "../style.css";
import { useNavigate } from 'react-router-dom';
const Login = () => {
  let navigate = useNavigate(); 

  //input tracker
  let [loginData,setLoginData] = useState({
    usermail:"",
    userpassword:""
  })
  let inputHandler = (e)=>{
      let {name,value} = e.target;
      setLoginData((prevInputs)=>{
        return {
          ...prevInputs,
          [name]:value
        }
      })
  }
  // styling box
  let boxStyle = {
    backgroundColor:"#176B87",
    padding:"10px 20px",
    margin:"100px 8%",
    borderRadius:"5px"
  }
  // submit handler
  let [error,setError] = useState({
    validator:false,
    message:""
  })
  let submitHandler = async (e) =>{
      e.preventDefault();
      try {
        let response = await axios.post(`${baseUrl}/users/equals`,loginData);
        if(response.status === 200){
          
          setError({validator:true,message:response.data.message});
          console.log(response);
          localStorage.setItem("userid",response.data.user._id);
          localStorage.setItem("usermail",response.data.user.usermail);
          navigate("/");
        }else{
          navigate("/login");
        }
      } catch (error) {
        
        setError({validator:false,message:error.response.data.message});
        
      }
     
  


  }
  return (
    <>
    <Grow in>
      <Box sx={boxStyle}>
          <Typography variant='h6' textAlign={"center"} color={"yellow"}>{error.validator?null:error.message}</Typography>
          <form className='log-form' onSubmit={submitHandler} >

              <div className="log-form-element">
                  <FormLabel style={{color:"#EEEEEE"}} htmlFor='usermail'>Enter your email:</FormLabel><br /><br />
                  <TextField type='email' value={loginData.usermail} onChange={inputHandler} sx={{input:{color:"#EEEEEE"}}} label="Enter email" id='usermail' name='usermail' fullWidth required/>
              </div>
              <div className="log-form-element">
                <FormLabel style={{color:"#EEEEEE"}} htmlFor='userpassword'>Enter your password : </FormLabel><br /><br />
                <TextField type='password' value={loginData.userpassword} onChange={inputHandler} sx={{input:{color:"#EEEEEE"}}} label="Enter password" id='userpassword' name='userpassword' fullWidth required />
              </div>
              <Button type='submit' variant='contained' style={{marginTop:"20px",backgroundColor:"#64CCC5",color:"black"}} fullWidth >Login</Button>
          </form>
      </Box>
      </Grow>
    </>
  )
}

export default Login