import {  Menu, MenuItem } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { addMyInfo, resetState, toggleMainMenu, toggleTheme } from '../../redux/slice';
import { useLogoutMutation } from '../../redux/api';

const MainMenu = () => {
  const {anchorE1,myInfo}=useSelector(state=>state.service)
  const navigate=useNavigate()
  const [logoutMe,logoutMeData]=useLogoutMutation()
  const dispatch = useDispatch()
    const handleClose=()=>{
      dispatch(toggleMainMenu(null))
    };
    const handleToggleTheme=()=>{
      handleClose()
      dispatch(toggleTheme())
    };
    const handleLogOut=async()=>{
      handleClose()
      const res=await logoutMe()
      if(res.data.success){
        dispatch(resetState())
        navigate('/register', { replace: true });
      }
    }
    useEffect(()=>{
      if(logoutMeData.isSuccess){
        dispatch(addMyInfo(null))
        console.log("Logout")
      }
    },[logoutMeData.isSuccess])
  return (
    <>
    <Menu
    anchorEl={anchorE1}
    open={anchorE1!==null?true:false}
    onClose={handleClose}
    anchorOrigin={{vertical:"bottom",horizontal:"right"}}
    transformOrigin={{vertical:"top",horizontal:"right"}}
    >
        <MenuItem onClick={handleToggleTheme}>Toggle Theme</MenuItem>
        <Link to={`/profile/threads/${myInfo?._id}`}>
        <MenuItem>My Profile</MenuItem>
        </Link>
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
    </Menu>
    </>
  )
}

export default MainMenu