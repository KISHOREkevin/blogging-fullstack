import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './Home/Home';
import "./style.css";
import Login from './Auth/Login/Login';
import Signup from './Auth/Signup/Signup';
import UserDetails from './Details/UserDetails/UserDetails';
import BlogDetails from './Details/BlogDetails/BlogDetails';
import UpdateBlog from './Details/BlogDetails/UpdateBlog';
import AddBlog from './Details/BlogDetails/AddBlog';
import About from './About/About';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/blog/add' element={<AddBlog />} />
        <Route path='/blog/:blogId' element={<BlogDetails />} />
        <Route path='/blog/:blogId/update' element={<UpdateBlog />} />
        <Route path='/user/:userId' element={<UserDetails />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App