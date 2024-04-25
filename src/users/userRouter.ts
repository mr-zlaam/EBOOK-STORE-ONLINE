import { Router } from "express";
import { createUser, loginUser } from "../users/user.controller";
import { getAllUsers } from "./getAllUser.controller";

const userRouter = Router();
//routes
userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/getUsers", getAllUsers);
export default userRouter;
