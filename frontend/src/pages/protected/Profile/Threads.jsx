import { Stack, Typography } from '@mui/material'
import React from 'react'
import Post from '../../../components/home/Post'
import { useSelector } from 'react-redux'

const Threads = () => {
  const {darkMode,user}=useSelector(state=>state.service)
  return (
    <>
    {
      user?user?.threads.length>0?(<Stack
    flexDirection={"column"}
    gap={2}
    mb={10}
    p={2}
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
          maxWidth: "800px",   // Ensure it never exceeds 800px
          mx: "auto"           // Center horizontally
        }}
    >
      {
        user.threads.map((e)=>{return <Post key={e._id} e={e}/>})
      }
    </Stack>):(<Typography textAlign={'center'}>No threads yet!</Typography>):null
    }
    </>
  )
}

export default Threads