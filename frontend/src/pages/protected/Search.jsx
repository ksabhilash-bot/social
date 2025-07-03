import React from 'react'
import SearchInput from '../../components/search/SearchInput'
import { Stack, Typography } from '@mui/material'
import ProfileBar from '../../components/search/ProfileBar'
import { useSelector } from 'react-redux'

const Search = () => { 
  const {searchedUsers}=useSelector((state)=>state.service)
  return (
    <>
    <Stack
    flexDirection={"column"}
    justifyContent={"center"}
    gap={2}
    py={3}
    >
      <SearchInput/>
      <Stack
      flexDirection={"column"}
      mb={3}
      gap={1}
      mx={"auto"}
      sx={{
        width: { xs: "100%", sm: "80%", md: "60%", lg: "50%" },
        maxWidth: "800px",
        
      }}
      
      >
        {
        searchedUsers ? searchedUsers.length>0?searchedUsers.map((e=>{
          return <ProfileBar key={e._id} e={e}/>
        }))
        :"":(<Typography variant="h6"
        textAlign={'center'}>No search</Typography>)
      }
      </Stack>
      
    </Stack>
    
    </>
  )
}

export default Search