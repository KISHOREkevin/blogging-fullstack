import React from 'react';
import {Box,Grow} from "@mui/material";
import UserName from './UserName';
import UserBlogs from "./UserBlogsLayout/UserBlogs";
import Followers from "./UserFollowersLayout/Followers";
import Followings from './UserFollowersLayout/Followings';

const UserDetails = () => {
  return (
      <Grow in>
        <Box>
            <div className="user-name">
                <UserName />
                <UserBlogs />
                <Followings />
                <Followers />
                
            </div>
        </Box>
      </Grow>
  )
}

export default UserDetails