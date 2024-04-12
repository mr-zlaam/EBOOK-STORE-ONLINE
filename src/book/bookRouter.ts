import { Router } from "express";
import { createBook } from "./book.controller.ts";
import multer from "multer";
import path from "node:path";
import authenticate from "../middlewares/authenticate.ts";

const bookRouter = Router();
//routes
const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 3e7 },
});
bookRouter.post(
  "/",
  authenticate,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook
);
export default bookRouter;
