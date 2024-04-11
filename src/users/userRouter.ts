import { Router } from "express";
import { createUser } from "../users/user.controller.ts";

const userRouter = Router();
//routes
userRouter.post("/register", createUser);
export default userRouter;
