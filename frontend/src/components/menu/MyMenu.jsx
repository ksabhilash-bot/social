import { Menu, MenuItem, Stack } from '@mui/material'
import React,{useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import { toggleMyMenu } from '../../redux/slice'
import { useDeletePostMutation } from '../../redux/api'
const MyMenu = () => {
  const {anchorE2,postId}=useSelector(state=>state.service)
  const dispatch = useDispatch()
  const [deletePost,deletePostData]=useDeletePostMutation()
    const handleClose =()=>{
      dispatch(toggleMyMenu(null))
    }
    const handleDelete=async()=>{
        handleClose();
        const res=await deletePost(postId)
        console.log("delete",res)
    }
    useEffect(()=>{
      if(deletePostData?.isSuccess){
        console.log(deletePostData.data)
      }
      if(deletePostData?.isError){
        console.log(deletePostData.error)
      }
    },[deletePostData?.isSuccess,deletePostData?.isError])
  return (
    <>
    <Menu
    anchorEl={anchorE2}
    open={anchorE2!==null?true:false}
    onClose={handleClose}
    anchorOrigin={{vertical:"bottom",horizontal:"right"}}
    transformOrigin={{vertical:"top",horizontal:"right"}}
    >
      <Stack
      flexDirection={"row"}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Stack>
      
    </Menu>
    </>
  )
}

export default MyMenu