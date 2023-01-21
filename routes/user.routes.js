import { Router } from "express";
import { createUser, getUserData } from "../controllers/user.controllers.js";
import { verifyToken, isAdmin } from "../middleware/authJwt.js";
import { checkRolesExisted } from "../middleware/verifySignUp.js";

const userRouter = Router();

userRouter.post("/", [verifyToken, isAdmin, checkRolesExisted], createUser);
userRouter.get("/:id", verifyToken, getUserData)

export default userRouter;
