import { Grid, Stack, useMediaQuery ,Avatar} from '@mui/material'
import React from 'react'
import Navbar from './Navbar'
import { addPostModal } from '../../redux/slice'
import { RxAvatar } from "react-icons/rx";
import { MdHomeFilled } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { toggleMainMenu } from '../../redux/slice';
import { Link } from 'react-router-dom';
const Header = () => {
  const _700 =useMediaQuery("(min-width:700px)")
  const {darkMode,myInfo}=useSelector(state=>state.service)
  const dispatch=useDispatch()
  const toggleMenu=(e)=>{
    console.log(e.currentTarget)
    dispatch(toggleMainMenu(e.currentTarget))
  }
   const handleAddPost=()=>{
      dispatch(addPostModal(true))
    }
  return (
    <>
    {
      _700?(
        <Stack
    flexDirection={"row"}
    height={52}
    justifyContent={"space-around"} 
    alignItems={"center"}
    position={"sticky"}
    top={0}
    py={1}
    
    zIndex={10}
    >
        {
          darkMode?<img src="/whiteThread.png" className='rounded-xl' height={40} width={40} alt="logo"/>:<img src="/thread.webp" height={40} width={40} alt="logo"/>
        }
        <Stack justifyContent={"center"}
        width={'550px'}  
        color={'black'}
        zIndex={2}
        height={52}
        borderRadius={'10px'}
        sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)' // White with 80% opacity
    }}

        >
            <Navbar/>


        </Stack>
        <Stack ><button className='hover:cursor-pointer' ><GiHamburgerMenu onClick={toggleMenu} size={30} color={darkMode?"white":"black"} className='' /></button></Stack>
    </Stack>
      ):(<>
      <Stack
      position={"sticky"}
      top={1}
      justifyContent={"center"}
      width={'100%'}
      height={52}
      p={1}
      zIndex={9999}
      
      >
        <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            width="100%"
            height={60}
            bgcolor={darkMode ? "#121212" : "#fff"}
            position="fixed"
            top={0}
            zIndex={1200}
            borderTop="1px solid #ccc"
          >
            <Link to="/"><MdHomeFilled size={25} color={darkMode ? "white" : "black"} /></Link>
            <Link to="/search"><FaSearch size={25} color={darkMode ? "white" : "black"} /></Link>
            <MdEdit
              size={25}
              className='hover:cursor-pointer'
              onClick={handleAddPost}
              color={darkMode ? "white" : "black"}
            />
            
            <Link to={`/profile/threads/${myInfo?._id}`}>
              {myInfo ? <Avatar alt="U" src={myInfo?.profilepic} sx={{ width: 30, height: 30 }} /> : <RxAvatar size={25} color={darkMode ? "white" : "black"} />}
            </Link>
          </Stack>
      </Stack>
      <Grid container height={60} justifyContent={"space-between"} alignItems={"center"} px={5}>
        <Grid
        item xs={6} md={4}
        >
                  {
          darkMode?<img src="/whiteThread.png" height={40} width={40} alt="logo"/>:<img src="/thread.webp" height={40} width={40} alt="logo"/>
        }
        </Grid>
        <button className='hover:cursor-pointer'
        ><GiHamburgerMenu onClick={toggleMenu} size={30} color={darkMode?"white":"black"} className='' /></button>
      </Grid>
      </>)
    }
    </>
  )
}

export default Header