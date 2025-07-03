import { Avatar, Button, Chip, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query";
import { Link, Outlet, useParams } from "react-router-dom";
import { addProfileModal } from "../../../redux/slice";
import { useFollowUserMutation, useLazyUserDetailsQuery } from "../../../redux/api";
import { useSelector } from "react-redux";
import EditProfile from "../../../components/modals/EditProfile";
const ProfileLayout = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { myInfo, user } = useSelector((state) => state.service);
  const [isFollowing, setIsFollowing] = useState();
  const [realuser, setrealuser] = useState({});
  const [followUser, followUserdata] = useFollowUserMutation();
  const [triggerUserDetails, { data, isFetching, isLoading, isError, error }] = useLazyUserDetailsQuery();
  const handleOpenEditModal = () => {
    dispatch(addProfileModal(true));
  };

  const follow = async () => {
    if (data) {
      await followUser(params?.id);
    }
  };


  const checkIsFollowing = () => {
    if (data && myInfo) {
      const isTrue = data.user.followers.filter((e) => e._id === myInfo._id);
      if (isTrue.length > 0) {
        setIsFollowing(true);
        return;
      }
      setIsFollowing(false);
    }
  };
  useEffect(() => {
    checkIsFollowing();
  }, [data, myInfo]);
  useEffect(() => {
  if (params?.id) {
    triggerUserDetails(params.id);
  }
}, [params?.id]);
  useEffect(()=>{
    if(followUserdata.isSuccess){
      console.log("followed or unfollowed")
    }
    if(followUserdata.isError){
      console.log("Error in follow unfollow")
    }
  },[followUserdata.isSuccess,followUserdata.isError])

  useEffect(() => {
    if (myInfo?._id && params?.id) {
      if (myInfo._id === params.id) {
        setrealuser(myInfo);
      } else {
        setrealuser(user);
      }
    }
  }, [myInfo, user, params]);

  if (isLoading || isFetching) {
  return <div
  className="flex min-w-full justify-center items-center min-h-screen "
  ><span>Loading user details...</span></div>;
}

if (isError) {
  console.error("Failed to fetch user details:", error);
  return <div
  className="flex min-w-full justify-center items-center min-h-screen"
  >Error loading user details</div>;
}

if (!data) {
  return <div
  className="flex min-w-full justify-center items-center min-h-screen"
  >No user data available</div>;
}

  return (
    <>
      <Stack
        flexDirection={"column"}
        gap={2}
        p={2}
        m={2}
        borderRadius={"10px"}
        bgcolor={"#E6E3E3"}
        sx={{
          width: {
            xs: "90%", // Mobile: full width
            sm: "90%", // Small tablets: 90% width
            md: "800px", // Medium screens and up: fixed 800px
            lg: "900px",
            xl: "900px",
          },
          maxWidth: "800px", // Ensure it never exceeds 800px
          mx: "auto", // Center horizontally
        }}
      >
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          borderRadius={"10px"}
          sx={{
            width: {
              xs: "100%",
              sm: "100%",
              md: "100%",
              lg: "100%",
              xl: "100%",
            },
            p: 2,
          }}
        >
          <Stack flexDirection={"column"} gap={1}>
            <Typography variant="h2" fontWeight={"bold"} fontSize={"2rem"}>
              {realuser.username}
            </Typography>
            <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
              <Typography variant="h2" fontSize={"1rem"}>
                {realuser?.email}
              </Typography>
              <Chip
                label="threads.net"
                size="small"
                sx={{
                  fontSize: "0.8rem",
                  color: "white",
                  background: "#6E6464",
                }}
              />
            </Stack>
          </Stack>
          <Avatar
            src={realuser?.profilepic}
            sx={{
              height: "60px",
              width: "60px",
            }}
          />
        </Stack>
        <Typography variant="subtitle2">{realuser?.bio}</Typography>
        <Typography variant="caption">
          {" "}
          Followers:{realuser?.followers?.length ?? 0}
        </Typography>
        <Stack
          flexDirection={"row"}
          justifyContent={"end"}
          px={3}
          alignItems={"center"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="50"
            height="50"
            viewBox="0 0 48 48"
          >
            <path
              fill="#f48fb1"
              d="M21,46h15c5.5,0,10-4.5,10-10V21c0-5.5-4.5-10-10-10H21c-5.5,0-10,4.5-10,10v15C11,41.5,15.5,46,21,46z"
            ></path>
            <path
              fill="none"
              stroke="#18193f"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="3"
              d="M41.5,21.1v-4.6c0-5.5-4.5-10-10-10h-15c-5.5,0-10,4.5-10,10v3"
            ></path>
            <path
              fill="none"
              stroke="#18193f"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="3"
              d="M6.5,25.6v5.9c0,5.5,4.5,10,10,10h15c5.5,0,10-4.5,10-10v-4.6"
            ></path>
            <path
              fill="none"
              stroke="#18193f"
              strokeMiterlimit="10"
              strokeWidth="3"
              d="M24,15.5c-4.7,0-8.5,3.8-8.5,8.5s3.8,8.5,8.5,8.5s8.5-3.8,8.5-8.5S28.7,15.5,24,15.5z"
            ></path>
            <path
              fill="#18193f"
              d="M34,12c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S35.1,12,34,12z"
            ></path>
          </svg>
        </Stack>
        {myInfo?._id === params?.id ? (
          <Button
            size="large"
            mx="auto"
            sx={{
              ":hover": {
                backgroundColor: "black",
                boxShadow: "0px 0px 5px #000000",
              },
              width: "100%",
              color: "white",
              backgroundColor: "#302F2F",
            }}
            onClick={handleOpenEditModal}
          >
            Edit Profile
          </Button>
        ) : (
          <Button
            onClick={follow}
            size="large"
            mx="auto"
            sx={{
              ":hover": {
                backgroundColor: "black",
                boxShadow: "0px 0px 5px #000000",
              },
              width: "100%",
              color: "white",
              backgroundColor: "#302F2F",
            }}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}
      </Stack>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-around"}
        py={1}
        borderRadius={"10px"}
        my={1}
        pb={2}
        bgcolor={"#E6E3E3"}
        sx={{
          width: {
            xs: "90%", // Mobile: full width
            sm: "90%", // Small tablets: 90% width
            md: "800px", // Medium screens and up: fixed 800px
            lg: "900px",
            xl: "900px",
          },
          maxWidth: "800px",
          mx: "auto",
        }}
      >
        <Link className="link" to={`/profile/threads/${data?.user._id}`}>
          Threads
        </Link>
        <Link className="link" to={`/profile/replies/${data?.user._id}`}>
          Replies
        </Link>
        <Link className="link" to={`/profile/reposts/${data?.user._id}`}>
          Repost
        </Link>
      </Stack>
      <Outlet />
      <EditProfile/>
    </>
  );
};

export default ProfileLayout;
