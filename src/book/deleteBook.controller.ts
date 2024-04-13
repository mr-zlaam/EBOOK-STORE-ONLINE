import { type Request, type Response, type NextFunction } from "express";
import { BookModel } from "./book.model.ts";
import type { AuthRequest } from "../middlewares/authenticate.ts";

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { bookId } = req.params;

  try {
    const book = await BookModel.findByIdAndDelete(bookId);
    const _req = req as AuthRequest;
    if (book?.author.toString() !== _req.userId) {
      return next(
        res.status(403).json({
          success: false,
          message: "unauthorized User",
        })
      );
    }
    if (!book) {
      return next(
        res.status(400).json({
          success: false,
          message: "Book not found",
        })
      );
    }
    console.log("Book deleted successfully");
    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: book,
    });
  } catch (error: any) {
    console.log(error.message);
    return next(
      res.status(400).json({
        success: false,
        message: "Error while deleting the book",
        error: error.message,
      })
    );
  }
};
