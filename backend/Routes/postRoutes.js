import express from "express"
import { auth } from "../Middleware/auth.js"
import { addpost, deletepost, getallpost, likePost, reposts, singlePost } from "../Controllers/postController.js"
import { addComment, deleteComment } from "../Controllers/commentController.js"

const router = express.Router()

router.post("/addpost",auth,addpost)
router.get("/getallpost",auth,getallpost)
router.delete("/delete/:id",auth,deletepost)
router.put("/like/:id",auth,likePost)
router.put("/reposts/:id",auth,reposts)
router.get("/singlepost/:id",auth,singlePost)

//for comment
router.post("/addcomment/:id",auth,addComment)
router.delete("/deletecomment/:postId/:id",auth,deleteComment)

export const postRouter =router