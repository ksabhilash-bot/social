import {
  Button,
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSigninMutation, useLoginMutation } from "../redux/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [signinUser, signinUserData] = useSigninMutation();
  const [loginUser, { data, isSuccess }] = useLoginMutation();
  const [login, setLogin] = useState(false);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowPassword] = useState(false);
  const toogleLogin = () => {
    setLogin(!login);
  };
  const handleLogin = async () => {
    if (email === "" || password === "") {
      toast.error("Please Enter all fields");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter an valid email");
      return;
    }
    const data = { email, password };
    const res = await loginUser(data);
    console.log(res.data.success)
    if(res.data.success){
      navigate('/')
    }
    setEmail("");
    setPassword("");
  };
  const handleRegister = async () => {
    if (username === "" || email === "" || password === "") {
      toast.error("Please Enter all fields");
      return;
    }
    const data = { username, email, password };
    await signinUser(data);
    setUserName("");
    setEmail("");
    setPassword("");
  };
  useEffect(() => {
    if (signinUserData.isSuccess) {
      console.log(signinUserData);
    }
  }, [signinUserData.isSuccess]);
  useEffect(() => {
    if (isSuccess) {
      console.log("login success");
    }
  }, [isSuccess]);
  return (
    <>
      <Stack
        sx={{
          backgroundImage:
            "linear-gradient(210deg,rgba(0, 0, 0, 1) 4%, rgba(6, 4, 33, 1) 0%, rgba(28, 27, 27, 1) 14%, rgba(203, 177, 82, 1) 42%, rgba(23, 4, 16, 1) 92%);",
        }}
        width={"100%"}
        height={"100vh"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack
          flexDirection={"column"}
          mx={"auto"}
          gap={2}
          mt={2}
          sx={{
            width: {
              xs: "70%",
              sm: "70%",
              lg: "40%",
              md: "60%",
            },
          }}
        >
          <Typography
            color="white"
            variant="h4"
            fontSize={"1.5rem"}
            fontWeight={"bold"}
          >
            {login ? "Login with email" : "Register with an Email"}
          </Typography>
          {login ? null : (
            <TextField
              color="primary"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                  px: "10px",
                  color: "white",
                  "& fieldset": {
                    borderColor: "black", // Optional: change border color
                  },
                  "&:hover fieldset": {
                    borderColor: "lightgray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "black",
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
              }}
              label="Enter your username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          )}

          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                px: "10px",
                color: "white",
                "& fieldset": {
                  borderColor: "black", // Optional: change border color
                },
                "&:hover fieldset": {
                  borderColor: "lightgray",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputBase-input": {
                color: "black",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
            }}
            label="Enter your email"
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showpassword ? "text" : "password"}
            label="Enter your password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showpassword ? (
                      <FaEyeSlash color="white" />
                    ) : (
                      <FaEye color="white" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                px: "10px",
                color: "white",
                "& fieldset": {
                  borderColor: "black",
                },
                "&:hover fieldset": {
                  borderColor: "lightgray",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputBase-input": {
                color: "black",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
            }}
          />

          <Button
            variant={"outlined"}
            color="black"
            sx={{
              bgcolor: "#292727",
              color: "white",

              borderRadius: "10px",
              "&:hover": {
                bgcolor: "black",
              },
            }}
            onClick={login ? handleLogin : handleRegister}
          >
            {login ? "LOGIN" : "REGISTER"}
          </Button>
          <Typography
            variant="h4"
            fontSize={"1.3rem"}
            fontWeight={"bold"}
            mt={2}
            ml={2}
            sx={{
              width: {
                xs: "70%",
                sm: "70%",
                lg: "50%",
                md: "60%",
              },
            }}
          >
            {login ? "Don't have an Account? " : "Already have an account?"}
            <span
              className="inline-block text-white hover:cursor-pointer hover:text-zinc-950 underline"
              onClick={toogleLogin}
            >
              {login ? "Register" : "Login"}
            </span>{" "}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default Register;
