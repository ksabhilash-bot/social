import { Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Input from '../../components/home/Input'
import Post from '../../components/home/Post'
import { useAllPostQuery } from '../../redux/api'
import { useSelector } from 'react-redux'

const Home = () => {
  const [page,setpage]=useState(1)
  const [show,setShowMore]=useState(true)
  const  {data,isLoading}=useAllPostQuery(page)
  const {allPosts}=useSelector(state=>state.service)
  const handleClick=()=>{
    setpage((prev)=>prev+1)
  }
  useEffect(()=>{
    if(data){
      if(data.post.length<3){
        setShowMore(false)
      }
    }
  },[data])
  return (
    <>
    <Input/>
    <Stack
    flexDirection={"column"}
    gap={2}
    mb={10}

    >
      {
        allPosts?allPosts.length>0?allPosts.map((e)=>{
          return <Post key={e._id} e={e}/>
        }):<Typography variant="caption" textAlign={'center'}>No more Post</Typography>:isLoading?<Typography variant='caption' textAlign={'center'}>Loading</Typography>:null
      }
        
    </Stack>
    {
      setShowMore?<Button
      
      onClick={handleClick}
    sx={{
      my:5,
      p:3,
      textDecoration:"underline",
      cursor:"pointer"
    }}
    >Load More</Button>:allPosts?.length>0 && (
      <Typography
      variant='caption'
      textAlign={'center'}
      >You have reached the content</Typography>
    )
    }
    
    </>
  )
}

export default Home