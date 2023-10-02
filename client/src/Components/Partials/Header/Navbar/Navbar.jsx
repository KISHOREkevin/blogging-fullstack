import React from 'react'
import {Box} from "@mui/material";
import "./style.css";

const Navbar = () => {
  
  return (
      <>
        <Box>
            <nav className="nav-bar">
                <h1 className='nav-title'>Mission : Wandering</h1>
                <ul className='nav-links'>
                    <a href="/"><li>Home</li></a>
                    <a href="/about"><li>About</li></a>
                    {localStorage.length===0 ?
                    (<>
                    <a href="/login"><li>Log In</li></a>
                    <a href="/signup"><li>Sign Up</li></a>
                    </>)  : 
                    
                    (<>
                    <a href={`/user/${localStorage.getItem("userid")}`}><li>Your Profile</li></a>
                    <a href="/blog/add"><li>Add blog</li></a>
                    <a href="/" onClick={()=>{localStorage.clear()}}><li>Logout</li></a>
                    </>)}

                </ul>
            </nav>
        </Box>
      </>
  )
}

export default Navbar