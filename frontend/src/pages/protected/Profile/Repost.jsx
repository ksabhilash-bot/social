import React from 'react'
import Post from '../../../components/home/Post'
import { Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

const Repost = () => {
  const {darkMode}=useSelector(state=>state.service)
  const {user}=useSelector(state=>state.service)
  
 
  return (
     <>
     {
      user? user?.reposts.length>0?(<Stack
    flexDirection={"column"}
    gap={2}
    mb={10}
    py={2}
    borderRadius={'10px'}
    bgcolor={darkMode?"#1C1B1B":"#E6E3E3"}
    sx={{
          width: {
            xs: "90%",        // Mobile: full width
            sm: "90%",         // Small tablets: 90% width
            md: "800px",       // Medium screens and up: fixed 800px
            lg: "900px",
            xl: "900px"
          },
          maxWidth: "900px",   // Ensure it never exceeds 800px
          mx: "auto"           // Center horizontally
        }}
    >
      {
        user?.reposts.map((e)=>{return <Post key={e._id} e={e}/>})
      }
    </Stack>):(<Typography textAlign={'center'}>No repost yet!</Typography>):null
     }
    
    </>
  )
}

export default Repost