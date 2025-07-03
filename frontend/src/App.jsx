import React from 'react'
import { Toaster } from 'react-hot-toast';
import Loader from './components/common/Loader'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Header from './components/common/Header'
import Home from './pages/protected/Home'
import Search from './pages/protected/Search'
import Error from './pages/Error'
import Register from './pages/Register'
import { Box } from '@mui/material'
import { RxHalf1 } from 'react-icons/rx'
import ProtectedLayout from './pages/protected/ProtectedLayout'
import ProfileLayout from './pages/protected/Profile/ProfileLayout'
import Threads from './pages/protected/Profile/Threads'
import Replies from './pages/protected/Profile/Replies'
import Repost from './pages/protected/Profile/Repost'
import SinglePost from './pages/protected/SinglePost'
import { useMyInfoQuery } from './redux/api';
const App = () => {
  const {data,isError}=useMyInfoQuery()
  if(!data || isError){
    return(
      <BrowserRouter>
      <Routes>
        <Route exact path="/*" element={<Register/>}/>
      </Routes>
      </BrowserRouter>
    )
  }
  return (
    <>
    <Box>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<ProtectedLayout/>}>
        <Route exact path="" element={<Home/>}/>      
        <Route exact path="search" element={<Search/>}/>  
        <Route exact path="post/:id" element={<SinglePost/>}/>  
        <Route exact path="profile" element={<ProfileLayout/>}>
          <Route exact path="threads/:id" element={<Threads/>} />
          <Route exact path="replies/:id" element={<Replies/>} />
          <Route exact path="reposts/:id" element={<Repost/>} />
        </Route>      
        </Route>
        
        
        <Route exact path="*" element={<Error/>}/>
      </Routes>
      </BrowserRouter>
    </Box>
      
    </>
  )
}

export default App