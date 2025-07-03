import { Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CiMenuKebab } from "react-icons/ci";
import PostOne from './Post/PostOne';
import PostTwo from './Post/PostTwo';
import { useDispatch, useSelector } from 'react-redux';
import { addPostId, toggleMyMenu } from '../../redux/slice';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const Post = ({e}) => {
    const dispatch = useDispatch()
    
    const {darkMode,myInfo}=useSelector(state=>state.service)
    const [isadmin,setAdmin]=useState()
    const toggleMenu=(event)=>{
        dispatch(addPostId(e._id))
        dispatch(toggleMyMenu(event.currentTarget))
    }
    const checkisAdmin=()=>{
        if(e?.admin?._id===myInfo?._id){
            setAdmin(true)
            return;
        }
        setAdmin(false)
    }
    useEffect(()=>{
        if(e&&myInfo){
            checkisAdmin()
        }
    },[e,myInfo])
  return (
    <>
    <Stack
    flexDirection={"row"}
    justifyContent={"space-between"}
    borderBottom={"1px solid gray"}
    p={2}
    mx={"auto"}
    width={"70%"}
    sx={{
        ":hover":{
            cursor:"pointer",
            boxShadow:"10px 10px 10px gray"
        },
        transition:"all ease-in-out 0.3s"
    }}
    >
        <Stack
        flexDirection={"row"}
        gap={2}
        
        >
            <PostOne e={e}/>
            <PostTwo e={e}/>
        </Stack>
        <Stack
        sx={{
            maxHeight:"70px",
            maxWidth:"30px"
        }}
        flexDirection={"row"}
        justifyContent={"center"}
        >
            <Typography variant="caption" color={"GrayText"} fontSize={"0.5rem"}>{dayjs(e?.createdAt).fromNow()}</Typography>
            {isadmin?<CiMenuKebab size={20}
            color={darkMode?"white":"black"}
            onClick={toggleMenu}
            />:null}

        </Stack>
        
    </Stack>
    </>
  )
}

export default Post