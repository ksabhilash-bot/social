import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { skipToken } from '@reduxjs/toolkit/query';
import React, { useState,useRef } from "react";
import {useParams} from 'react-router-dom'
import { ImCross } from "react-icons/im";
import {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import {addProfileModal} from "../../redux/slice"
import {useUpdateProfileMutation,useLazyUserDetailsQuery} from "../../redux/api"

const EditProfile = () => {
  const dispatch = useDispatch()
   const params =useParams()
  const {openEditProfileModal,myInfo}=useSelector(state=>state.service)
  const [updateProfile,updateProfileData]=useUpdateProfileMutation()
  const {refetch}=useLazyUserDetailsQuery(params?.id ?? skipToken)
 
  const _800 = useMediaQuery("(min-width:800px)");
  const [pic, setPic] = useState();
  const [bio, setBio] = useState();
  const  imgRef=useRef()
  const handlePhoto=()=>{
    imgRef.current.click()
  }
  const handleClose = () => {
    dispatch(addProfileModal(false))
    
  };
  const handleUpdate =async()=>{
    if(pic || bio){
      const data = new FormData()
      if(bio){
        data.append('text',bio)
      }
      if(pic){
        data.append('media',pic)
      }
      await updateProfile(data)
    }
    dispatch(openEditProfileModal(false))
  }
  useEffect(()=>{
    if(updateProfileData?.isSuccess){
      refetch()
      console.log(updateProfileData?.data)
    }
    if(updateProfileData?.isError){
      console.log(updateProfileData?.error)
    }
  },[updateProfileData?.isSuccess,updateProfileData?.isError])
  return (
    <>
      <Dialog
        open={openEditProfileModal}
        onClose={handleClose}
        fullWidth
        fullScreen={_800 ? false : true}
      >
        <Box position={"absolute"} top={20} right={20} onClick={handleClose}>
          <ImCross size={28} />
        </Box>
        <DialogTitle textAlign={"center"} mb={5}>
          Edit Profile
        </DialogTitle>
        <DialogContent>
          <Stack flexDirection={"column"} gap={1}>
            <Avatar
              src={myInfo?myInfo?.profilepic:""}
              alt="user"
              sx={{
                width: 96,
                height: 96,
                alignSelf: "center",
              }}
            />
            <Button
            onClick={handlePhoto}
              size="large"
              sx={{
                ":hover": {
                  cursor: "pointer",
                },
                border: "2px solid black",
                borderRadius: "10px",
                my: 2,
              }}
            >
              Change
            </Button>
            <input onChange={(e)=>setPic(e.target.files[0])} ref={imgRef} type="file" className="file-input" accept="image/*" />
            <Typography
              variant="subtitle1"
              fontWeight={"bold"}
              fontSize={"1rem"}
            >
              Username
            </Typography>
            <input
              type="text"
              value={myInfo?myInfo.username:""}
              readOnly
              className="text1"
            />
          </Stack>
          <Stack flexDirection={"column"} gap={1}>
            <Typography
              variant="subtitle1"
              fontWeight={"bold"}
              fontSize={"1rem"}
            >
              Email
            </Typography>
            <input
              type="text"
              value={myInfo?myInfo?.email:""}
              readOnly
              className="text1"
            />
          </Stack>
          <Stack flexDirection={"column"} gap={1}>
            <Typography
              variant="subtitle1"
              fontWeight={"bold"}
              fontSize={"1rem"}
            >
              Bio
            </Typography>
            <input
            onChange={(e)=>setBio(e.target.value)}
              type="text"
              value={bio?bio:""}
              placeholder={myInfo?myInfo?.bio:""}
              className="text1"
            />
          </Stack>
          <Button
          onClick={handleUpdate}
            size="large"
            sx={{
              border: "2px solid gray",
              borderRadius: "10px",
              bgcolor: "GrayText",
              color: "white",
              width: "100%",
              my: 2,
              fontSize: "1.2rem",
              ":hover": {
                cursor: "pointer",
                bgcolor: "gray",
              },
            }}
          >
            Update
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProfile;
