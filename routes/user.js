import express from "express"
import { loginUser, logoutUser } from "../controller/user.js"
import { isAuthenticated } from "../auth/isAuthenticated.js"


const router = express.Router()

router.post("/user/login", loginUser)

router.get("/user/logout", isAuthenticated, logoutUser)







export default router