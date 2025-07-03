import React ,{useEffect, useState}from 'react'
import {InputAdornment, TextField} from '@mui/material'
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import {useLazySearchUserQuery} from '../../redux/api'
import { addToSearchedUsers } from '../../redux/slice';

const SearchInput = () => {
  const {darkMode}=useSelector(state=>state.service)
  const [query,setQuery]=useState();
  const [searchUser,searchUserData]=useLazySearchUserQuery();
  const dispatch =useDispatch();
  const handleSearch =async(e)=>{
    if(query && e.key ==='Enter'){
      await searchUser(query)
    }
  }
  useEffect(()=>{
    if(searchUserData.isSuccess){
      dispatch(addToSearchedUsers(searchUserData.data.users))      
    }
    if(searchUserData.isError){
      console.log(searchUserData.error)
    }
  },[searchUserData.isSuccess,searchUserData.isError])
  
  return (
    <>
    <TextField 
        placeholder='search'
       onChange={(e)=>setQuery(e.target.value)}
       onKeyUp={handleSearch}
        sx={{
            width:"90%",
            maxWidth:"750px",
            boxShadow:"5px 5px 5px gray",
            borderRadius:"10px",
            border: darkMode ? "1px solid white" : "1px solid black",
            px:2,
            py:1,                 
            mx:"auto",
            "& .MuiOutlinedInput-root": {
                color:darkMode?"white":"black",
              "& fieldset": {
                border:"none",
              },
            }
        }}
        slotProps={{
            input: {
                startAdornment: (
                    <InputAdornment position='start' sx={{color:"black"}}>
                        <FaSearch 
                        onClick={handleSearch}
                        size={28} color={darkMode?"white":"black"}/>
                    </InputAdornment>
                ),
            }
        }}
    />
    </>
  )
}

export default SearchInput