import { Router } from "express";
import { createBook } from "./book.controller";
import multer from "multer";
import path from "node:path";
import authenticate from "../middlewares/authenticate";
import { updateBook } from "./updateBook.controller";
import { listBooks } from "./listBooks.controller";
import { listOneBook } from "./listOneBook.controller";
import { deleteBook } from "./deleteBook.controller";

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
bookRouter.patch(
  "/:bookId",
  authenticate,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  updateBook
);
bookRouter.get("/", listBooks);
bookRouter.get("/:bookId", listOneBook);
bookRouter.delete("/:bookId", authenticate, deleteBook);

export default bookRouter;
