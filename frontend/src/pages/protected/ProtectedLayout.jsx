import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from '../../components/common/Header'
import { Stack } from '@mui/material'
import AddPosts from '../../components/modals/AddPosts'
import EditProfile from '../../components/modals/EditProfile'
import MainMenu from '../../components/menu/MainMenu'
import MyMenu from '../../components/menu/MyMenu'
import { useSelector } from 'react-redux'

const ProtectedLayout = () => {
  const {darkMode}=useSelector(state=>state.service)
  return (
    <Stack
    flexDirection={"column"}
    maxWidth={"800px"}
    minWidth={"100%"}
    mx={'auto'}
    minHeight={"100vh"}
    bgcolor={darkMode?"black":"white"}
    
    >
      
        <Header/>
      <AddPosts/>
      <EditProfile/>
        <MainMenu/>
        <Outlet/>
        <MyMenu/>
    </Stack>
  )
}

export default ProtectedLayout