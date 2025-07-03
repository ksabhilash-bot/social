import { Avatar, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileBar = ({ e }) => {
  const { darkMode } = useSelector((state) => state.service);
  return (
    <>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        px={1}
        py={2}
        mx={"auto"}
        border={darkMode ? "1px solid white" : "1px solid black"}
        borderRadius={"15px"}
        width={"90%"}
        boxShadow={"5px 5px 5px gray"}
        sx={{
          ":hover": {
            cursor: "pointer",
          },
        }}
      >
        <Stack flexDirection={"row"} gap={2}>
          <Avatar src={e ? e?.profilepic : ""} alt="" />
          <Stack gap={0.6} flexDirection={"column"}>
            <Link to={`/profile/threads/${e._id}`}>
              <Typography
                variant="h5"
                color={darkMode ? "white" : "black"}
                fontWeight={"bold"}
                fontSize={"1rem"}
              >
                {e?.username ? e?.username : ""}
              </Typography>
            </Link>
            <Typography variant="caption" fontSize={"1rem"} color={"gray"}>
              This is bio
            </Typography>
            <Typography
              variant="caption"
              color={darkMode ? "white" : "black"}
              fontSize={"1rem"}
            >
              {e?.followers.length} followers
            </Typography>
          </Stack>
        </Stack>
        <Link to={`/profile/threads/${e._id}`}>
          <Button
            size="medium"
            sx={{
              border: "1px solid #7f8c8d", // A slightly darker, muted gray border
              color: "white", // White text for good contrast
              bgcolor: "black", // Dark bluish-gray to very light, cool gray
              borderRadius: "10px",
              p: 2,
              height: 40,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Adds a subtle shadow for depth
              transition: "all 0.3s ease-in-out", // Smooth transition for hover effects
              "&:hover": {
                bgcolor: "white",
                color: "black",
                border: "1px solid #7f8c8d", // Maintain the border color on hover
                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)", // More pronounced shadow on hover
                transform: "translateY(-1px)", // Slight lift effect on hover
              },
            }}
          >
            Follow
          </Button>
        </Link>
      </Stack>
    </>
  );
};

export default ProfileBar;
