import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, Stack, Typography, useMediaQuery } from '@mui/material'
import React, { useRef, useState,useEffect } from 'react'
import { ImCross } from "react-icons/im";
import { FaImages } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addPostModal } from '../../redux/slice';
import { useAddPostMutation } from '../../redux/api';
const AddPosts = () => {
  const {openAddPostModal,myInfo}=useSelector(state=>state.service)
  const [addNewPost,addNewPostData]=useAddPostMutation()
    const _700=useMediaQuery("(min-width:800px)");
    const _500=useMediaQuery("(min-width:500px)");
    const _300=useMediaQuery("(min-width:300px)");
    const dispatch = useDispatch()
    const handleClose=()=>{
      dispatch(addPostModal(false))
    }
    
    const [text,setText]=useState()
    const [media,setMedia]=useState()
    const mediaRef=useRef();
    const handleMediaref=()=>{
      mediaRef.current.click()
    }
    const handlePost=async()=>{
      const data=new FormData();
      if(text){data.append('text',text);}
      if(media){data.append('media',media);}
      await addNewPost(data);
    }
    useEffect(()=>{
      if(addNewPostData.isSuccess){
        setText()
        setMedia()
        dispatch(addPostModal(false))
      }
      if(addNewPostData.isError){
        console.log(addNewPostData.error)
      }
    },[addNewPostData.isSuccess,addNewPostData.isError])

    
  return (
    <>
    <Dialog open={openAddPostModal}
    onClose={handleClose}
    
    fullWidth
    fullScreen={_700?false:true}
    >
        <Box
        position={'absolute'}
        top={20}
        zIndex={1000}
        right={20}
        onClick={handleClose}
        >
          <ImCross size={28} /></Box>
          <DialogTitle textAlign={"center"} mb={5}>
            New Thread....
          </DialogTitle>
          <DialogContent>
            <Stack
            flexDirection={"row"}
            mb={5}
            gap={2}
            >
              <Avatar src={myInfo?myInfo?.profilepic:""}/>
              <Stack>
                <Typography variant='h6' fontWeight={"bold"} fontSize={"1rem"}>{myInfo?myInfo?.username:""}</Typography>
                <textarea cols={_500?40:25} rows={2}
                className='text1'
                placeholder='Start a thread'
                autoFocus
                onChange={(e)=>setText(e.target.value)}
                />
                {media?<img src={URL.createObjectURL(media)} id="url-img" width={_500?300:_300?200:100} height={_500?300:_300?200:100}/>:null}
                <FaImages size={28} onClick={handleMediaref}  />
                <input 
                ref={mediaRef}
                
                onChange={(e)=>setMedia(e.target.files[0])}
                type='file' accept="image/*" className='file-input'/>
              </Stack>
            </Stack>
          <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          >
            <Typography
            fontSize={"1rem"}
            color={"gray"}
            variant='h6'
            >Anyone can reply</Typography>
            <Button
            size="large"
            sx={{
              bgcolor:"GrayText",
              color:"white",
              borderRadius:"10px",
              ":hover":{
                bgcolor:"gray",
                cursor:"pointer"
              },
            }}
            onClick={handlePost}
            >POST</Button>
          </Stack>
          </DialogContent>
        
    </Dialog>
    </>
  )
}

export default AddPosts