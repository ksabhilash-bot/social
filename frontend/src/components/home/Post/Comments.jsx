import { Avatar, Menu, MenuItem, Stack, Typography } from '@mui/material'
import React, { useState,useEffect } from 'react'
import { HiMenuAlt3 } from "react-icons/hi";
import { useSelector } from 'react-redux';
import {useDeleteTheCommentMutation,useSinglePostQuery} from "../../../redux/api"

const Comments = ({e,postId}) => {
    console.log("comments",e)
    const {myInfo}=useSelector(state=>state.service)
    const[isadmin,setisAdmin]=useState()
    const [deleteComment,deleteCommentdata]=useDeleteTheCommentMutation();
    const {refetch}=useSinglePostQuery(postId)
    const [anchorEl,setAnchorEl]=useState(null)
  const handleClose=()=>{
    setAnchorEl(null)
  }
  const handleDeleteComment=async()=>{
    const info={
        postId,
        id:e?._id
    }
    await deleteComment(info);
    handleClose();
    refetch()
  }
  const checkIsAdmin=()=>{
    if(e&&myInfo){
        if(e?.admin?._id===myInfo?._id){
            setisAdmin(true);
            return
        }
    }
    setisAdmin(false)
  }
  useEffect(() => {
    checkIsAdmin()
  }, []);
  useEffect(() => {
    if(deleteCommentdata.isSuccess){
        console.log(deleteCommentdata.data)
    }
    if(deleteCommentdata.isError){
        console.log(deleteCommentdata.error)
    }
  }, [deleteCommentdata.isSuccess,deleteCommentdata.isError])
  
  return (
    <>
    <Stack
    flexDirection={"row"}
    justifyContent={"space-between"}
    px={2}
    py={4}
    borderBottom={'1px solid gray'}
    mx={'auto'}
    width={"90%"}
    >
        <Stack
        flexDirection={"row"}
        gap={2}
        >
            <Avatar src={e?e?.admin?.profilepic:""}/>
            <Stack
            flexDirection={"column"}
            >
                <Typography variant="h6" fontSize={"0.9rem"}>{e?.admin?.username}</Typography>
                <Typography variant="subtitle2" fontSize={"0.9rem"}>{e?.text}</Typography>

            </Stack>
        </Stack>
        <Stack
        flexDirection={"row"}
        gap={1}
        alignItems={"center"}
        color={"grayText"}
        fontSize={"0.8rem"}
        >
            <p>{e?.createdAt ? new Date(e.createdAt).toLocaleString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
}) : null}</p>
            {
                isadmin?(<HiMenuAlt3
            className='hover:cursor-pointer'
            onClick={(e)=>setAnchorEl(e.currentTarget)}
            size={20} />):(<HiMenuAlt3
            className='hover:cursor-pointer'
            size={20} />)
            }
        </Stack>
    </Stack>
    <Menu
        anchorEl={anchorEl}
        open={anchorEl?true:false}
        onClose={handleClose}
        anchorOrigin={{vertical:"bottom",horizontal:"right"}}
        transformOrigin={{vertical:"top",horizontal:"right"}}
        >
            <MenuItem onClick={handleDeleteComment}>Delete</MenuItem>
        </Menu>
    
    </>
  )
}

export default Comments