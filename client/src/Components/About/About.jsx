import { Box, Grow, Typography } from '@mui/material'
import React from 'react'

const About = () => {
    let boxStyle={
        backgroundColor:"#176B87",
        color:"#EEEEEE",
        padding:"2%",
        margin:"2%",
        mt:"6%",
        borderRadius:"5px"
    }
  return (
    <Grow in>
        <Box sx={boxStyle}>
            <Typography variant='h3' textAlign={"center"} fontWeight={"bolder"}>Mission : Wandering</Typography>
            <Typography variant='h5' textAlign={"center"}>A blogging platform for everyone</Typography>
            <Typography variant='h6' fontWeight={"bold"} marginTop={"5px"}>Introduction :</Typography>
            <Typography variant='body1'>Welcome to Mission Wandering! We're a blogging platform that's easy to use and packed with features to help you share your stories with the world. Whether you're a seasoned blogger or just starting out, we've got you covered.</Typography>
            <Typography variant='h6' fontWeight={"bold"} marginTop={"5px"}>What we offer:</Typography>
            <ul>
                <li>A simple and intuitive user interface</li>
                <li>A wide range of customization options</li>
                <li>Powerful features like social media integration, SEO tools, and analytics</li>
                <li>A supportive community of bloggers</li>
            </ul>
            <Typography variant='h6' fontWeight={"bold"} marginTop={"5px"}>Our mission:</Typography>
            <Typography variant='body1'>Our mission is to make it easy for everyone to share their stories with the world. We believe that everyone has a story to tell, and we want to help them tell it in the best way possible.</Typography>
            <Typography variant='h6' textAlign={"center"} marginTop={"5px"}>Ready to start blogging? Sign up for a free account today!</Typography>

        </Box>
    </Grow>
  )
}

export default About