import { Avatar, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import { addPostModal } from '../../redux/slice'
const Input = () => {
  const {myInfo}=useSelector(state=>state.service)
  const dispatch = useDispatch()
  const {darkMode}=useSelector(state=>state.service)
  const handleAddPost=()=>{
    dispatch(addPostModal(true))
  }
  return (
    <>
    <Stack
    onClick={handleAddPost}
    flexDirection={"row"}
    alignItems={"center"}
    width={"70%"}
    height={28}
    justifyContent={"space-between"}
    padding={3}
    borderBottom={"2px solid gray"}
    my={5}
    mx={"auto"}
    >
        <Stack
        flexDirection={"row"}
        alignItems={"center"}
        gap={2}
        >
            <Avatar src={myInfo?myInfo.profilepic:""} alt="U"/>
            <Typography color={"GrayText"}>Start a Thread....</Typography>
        </Stack>
        <Button size='medium' sx={{
            bgcolor:"gray",
            color:darkMode?"black":"white",
            '&:hover': {
                bgcolor:darkMode?"white": 'black',
            },
        }}>POST</Button>
    </Stack>
    </>
  )
}

export default Input