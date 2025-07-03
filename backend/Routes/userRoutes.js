import express from 'express'
import { followUser, login, logout, myinfo, searchUser, signin, updateUser, userDetails } from '../Controllers/userController.js'
import { auth } from '../Middleware/auth.js'
const router = express.Router()

router.post('/signin',signin)
router.post('/login',login)
router.get('/userdetail/:id',auth,userDetails)
router.put("/follow/:id",auth,followUser)
router.put("/update",auth,updateUser)
router.get("/search/:query",auth,searchUser)
router.post("/logout",auth,logout)
router.get("/me",auth,myinfo)

export const userRouter = router