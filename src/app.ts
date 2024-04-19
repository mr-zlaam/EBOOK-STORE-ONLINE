import express from "express";
import GlobalErrHandler from "./middlewares/GlobalErrHandler.middleware";
import userRouter from "./users/userRouter";
import bookRouter from "./book/bookRouter";
const app = express();
import cors from "cors";
app.use(express.json());
// const whiteList = ["http://localhost:3000"];
// const corsOptions = {
//   origin: function (origin: any, callback: any) {
//     if (whiteList.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

app.use(cors());
//Gloabl handler
app.use(GlobalErrHandler);
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
export default app;
