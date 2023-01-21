import { Router } from "express";
import { checkEmailForForgotPassword, signIn, signUp, createNewPassword } from "../controllers/auth.controllers.js";
import { checkDuplicateEmail, checkRolesExisted } from "../middleware/verifySignUp.js";
import { verifyToken } from "../middleware/authJwt.js";

const authRouter = Router()

authRouter.post("/signin", signIn)
authRouter.post("/signup",[checkDuplicateEmail, checkRolesExisted], signUp)
authRouter.post("/check-email", checkEmailForForgotPassword)
authRouter.put("/new-password", verifyToken, createNewPassword)

export default authRouter