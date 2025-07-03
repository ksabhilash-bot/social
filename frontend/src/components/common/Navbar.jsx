import {Stack, useMediaQuery,Avatar} from '@mui/material';
import { MdHomeFilled } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

import { RxAvatar } from "react-icons/rx";
import { Link,useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import { addPostModal } from '../../redux/slice';
const Navbar = () => {
  const {darkMode,myInfo}=useSelector(state=>state.service)

  const _700=useMediaQuery("(min-width:700px)")
  const dispatch = useDispatch()
  const handleAddPost=()=>{
    dispatch(addPostModal(true))
  }

  return (
    <>
    {
      _700?(<Stack
    flexDirection={"row"}
    maxWidth={"100%"}
    justifyContent={"space-around"}
    alignItems={"center"}
    sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
         // White with 80% opacity
    }}

    >
        <Link to="/"><MdHomeFilled size={30} color={"black"} /></Link>
        <Link to="/search"><FaSearch size={30} color={"black"}/></Link>
        <MdEdit size={30} 
        className='hover:cursor-pointer'
        onClick={handleAddPost}
        color={"black"} />
        <Link to={`/profile/threads/${myInfo?._id}`}>{myInfo?<Avatar alt="U" src={myInfo?.profilepic} />:<RxAvatar size={30} color={"black"}/>}</Link>

    </Stack>):null
    }
    </>
  )
}

export default Navbar