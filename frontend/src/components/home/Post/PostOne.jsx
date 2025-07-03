import { Avatar, AvatarGroup, Badge, Stack, Stepper } from '@mui/material'
import React from 'react'
import {Link} from "react-router-dom"

const PostOne = ({e}) => {
    
  return (
    <>
    <Stack
    flexDirection={"column"}
    alignItems={"center"}
    justifyContent={"space-between"}
    >
        
        <Link to={`/profile/threads/${e?.admin?._id}`}><Badge overlap='circular' anchorOrigin={{vertical:"bottom", horizontal:"right"}}
        badgeContent={<Avatar src=""
        sx={{
            width:20,
            height:20,
            backgroundColor:"black",
            position:"relative",
            right:4,
            bottom:4,
        }}
        >+</Avatar>}
        >
            <Avatar 
            src={e?.admin?.profilepic}
  alt={e?.admin?.username?.[0] || "U"}
            sx={{width:40, height:40}}/>
        </Badge></Link>
        <Stack
        flexDirection={"column"}
        alignItems={"center"}
        gap={2}
        height={"100%"}
        >
            <Stepper
            orientation={'vertical'}
            activeStep={0}
            sx={{
                border:"0.1rem solid gray",
                width:"0px",
                height:"100%",
            }}
            />
                
            
            <AvatarGroup total={e?.comments.length}
            sx={{
                '& .MuiAvatar-root':{
                    width:24,
                    height:24,
                    fontSize:"0.8rem",
                }
            }}
            >
                <Avatar src={e?.likes[0]?.admin?.profilepic} alt="user"/>
                {
                    e?.comments.length>1?(<Avatar src={e?.comments[1]?.admin?.profilepic} alt="user"/>):null
                }
            </AvatarGroup>
        </Stack>
    </Stack>
    </>
  )
}

export default PostOne