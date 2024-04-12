// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!UpdateBookController!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import { type NextFunction, type Request, type Response } from "express";
import { BookModel } from "./book.model";
import type { AuthRequest } from "../middlewares/authenticate";
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, genre } = req.body;
  const bookId = req.params.bookId;
  const book = await BookModel.findOne({ _id: bookId });
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found",
    });
  }
  const _req = req as AuthRequest;
  if (book.author.toString() !== _req.userId) {
    return res.status(403).json({
      success: false,
      message: "unauthorized User",
    });
  }
  let completeCoverImage = "";
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  if (files.coverImage) {
    const fileName = files.coverImage[0].filename;
    const converMimeType = files.coverImage[0].mimetype.split("/").at(-1);
    //Todo: Resume from here
  }
  return res.json({
    message: "Update book is working",
  });
};
