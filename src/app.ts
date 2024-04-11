import express from "express";
import GlobalErrHandler from "./middlewares/GlobalErrHandler.middleware.ts";
const app = express();
app.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});
//Gloabl handler
app.use(GlobalErrHandler);
export default app;
