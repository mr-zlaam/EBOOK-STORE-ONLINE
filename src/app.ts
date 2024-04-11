import express from "express";
import GlobalErrHandler from "./middlewares/GlobalErrHandler.middleware.ts";
import userRouter from "./users/userRouter.ts";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});
//Gloabl handler
app.use("/api/users", userRouter);
app.use(GlobalErrHandler);
export default app;
