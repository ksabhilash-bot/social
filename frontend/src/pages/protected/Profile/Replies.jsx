import { Stack, Typography } from '@mui/material'
import React from 'react'
import Comments from '../../../components/home/Post/Comments'
import { useSelector } from 'react-redux'

const Replies = () => {
  const {user}=useSelector(state=>state.service)
  
  return (
    <>
    <Stack
    flexDirection={"column"}
    gap={2}
    mb={10}
    p={1}
    borderRadius={'10px'}
    bgcolor={"#E6E3E3"}
    sx={{
          width: {
            xs: "90%",        // Mobile: full width
            sm: "90%",         // Small tablets: 90% width
            md: "800px",       // Medium screens and up: fixed 800px
            lg: "900px",
            xl: "900px"
          },
          maxWidth: "800px",
          
          mx: "auto"         
        }}
    >
      {
      user?user?.replies.length>0?user?.replies.map((e)=>{return <Comments key={e?._id} e={e} postId={e.post}/>}):(<Typography textAlign={'center'}>No replies yet</Typography>):null
      }
    </Stack>
    </>
  )
}

export default Replies