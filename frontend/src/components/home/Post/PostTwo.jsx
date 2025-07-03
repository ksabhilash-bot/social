import { Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import { FaHeart } from "react-icons/fa";

import {FaRegHeart,FaRegComment,FaRetweet} from "react-icons/fa6";
import {IoMdSend} from "react-icons/io";
import { useSelector } from 'react-redux';
import { useLikePostMutation, useRepostMutation } from '../../../redux/api';
const PostTwo = ({e}) => {
    
    const {darkMode,myInfo}=useSelector(state=>state.service)
    const [isLike,setIsLike]=useState()
    const [likePost]=useLikePostMutation();
    const[repost,repostData]=useRepostMutation();
    const handleLike=async()=>{
        await likePost(e?._id);
    }
    const checkisLiked=()=>{
        if(e?.likes.length>0){
            const variable=e.likes.filter((ele)=>ele._id ===myInfo._id)
            if(variable.length>0){
                setIsLike(true);
                return
            }
        }
        setIsLike(false)
    }
    const handleRepost=async()=>{
        const res=await repost(e?._id)
        console.log("repost",res)
    }
    useEffect(()=>{
        checkisLiked()
    },[e])
    useEffect(()=>{
        if(repostData.isSuccess){
            console.log(repostData.data)
        }
        if(repostData.isError){
            console.log(repostData.error)
        }
    },[repostData.isSuccess,repostData.isError])
  return (
    <>
    <Stack
    flexDirection={"column"}
    justifyContent={"space-between"}
    >
        
        <Stack
        flexDirection={'column'}
        gap={2}
        >
            <Stack flexDirection={"column"}>
                <Link to={`/post/${e?._id}`}>
                <Typography
                color={darkMode?"white":"black"}
                variant='h6' fontSize={"1rem"} fontWeight={"bold"}
                >{e?.admin?.username}</Typography>
                {
                    e?.text?(<Typography
                variant="caption"
                color={darkMode?"white":"black"}
                fontSize={"0.9rem"} 
                >{e?.text}</Typography>):null
                }
                </Link>
            </Stack>
            {e?.media?(<img src={e?.media} loading='lazy' width={'400px'} height={'auto'}/>):null}
        </Stack>
        <Stack
        flexDirection={"row"}
        gap={2}
        m={1}
        >
            {
                isLike?<FaHeart
                onClick={handleLike}
            color={"red"}
            size={20} />:<FaRegHeart
            onClick={handleLike}
            color={darkMode?"white":"black"}
            size={20} />
            }
            <Link
            to={`/post/${e?._id}`}
            >
            <FaRegComment
            color={darkMode?"white":"black"} size={20} /></Link>
            <FaRetweet
            onClick={handleRepost}
            color={darkMode?"white":"black"} size={20} />
            
        </Stack>
        <Stack
        flexDirection={"row"}
        gap={1}
        position={"relative"}
        top={-3}
        left={4}
        >
            <Typography variant='caption' fontSize={"0.8rem"} color={"GrayText"}>{e?.likes?.length} likes</Typography>
            <Typography variant='caption' fontSize={"0.8rem"} color={"GrayText"}>{e?.comments?.length} comments</Typography>
        </Stack>
        
    </Stack>
    </>
  )
}

export default PostTwo