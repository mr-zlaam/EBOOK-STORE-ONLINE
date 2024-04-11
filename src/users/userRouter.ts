import { Router } from "express";
import { createUser, loginUser } from "../users/user.controller.ts";

const userRouter = Router();
//routes
userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
export default userRouter;
