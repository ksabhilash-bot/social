import React, { useEffect, useState } from 'react'
import { Stack, TextField } from '@mui/material'
import Post from '../../components/home/Post'
import Comments from '../../components/home/Post/Comments'
import { useParams } from 'react-router-dom'
import { skipToken } from '@reduxjs/toolkit/query';
import { useAddTheCommentMutation, useSinglePostQuery } from '../../redux/api'
const SinglePost = () => {
  const [comment,setComment]=useState("")
  const params=useParams()
  const {data,refetch}=useSinglePostQuery(params?.id ?? skipToken);
  const[addTheComment,addTheCommentData]=useAddTheCommentMutation();
  const handleAddComment=async(e)=>{
    if(data && e.key==='Enter'){
      const info ={
        id:data.post._id,
        text:comment,
      };
      const res=await addTheComment(info)
      console.log("comment",res)
    }
  }
  useEffect(()=>{
    if(addTheCommentData.isSuccess){
      setComment("")
      refetch()
      console.log(addTheCommentData.data)
    }
    if(addTheCommentData.isError){
      console.log(addTheCommentData.error)
    }
  },[addTheCommentData.isSuccess,addTheCommentData.isError])
  return (
    <>
    <Stack
    flexDirection={"column"}
    my={5}
    gap={2}
    >
        <Post e={data?.post}/>
        <Stack
        flexDirection={"column"}
        gap={2}
        width={"80%"}
        mx={'auto'}
        >
            {
              data?data.post.comments.length>0?data?.post?.comments.map((e)=>{
                return <Comments key={e._id} e={e} postId={data?.post._id}/>
              }):null:null
            }
        </Stack>
        <TextField 
        value={comment?comment:''}
        onKeyUp={handleAddComment}
        onChange={(e)=>setComment(e.target.value)}
        variant='outlined' autoFocus placeholder='comment here..'
        id='comment' sx={{
            width:'50%',mx:'auto',my:5,p:1
        }}
        />
    </Stack>
    </>
  )
}

export default SinglePost