import { type Request, type Response, type NextFunction } from "express";
import { BookModel } from "./book.model";
export const listOneBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { bookId } = req.params;
  try {
    const book = await BookModel.findOne({ _id: bookId });
    if (!book) {
      return next(
        res.status(400).json({
          success: false,
          message: "Book not found!",
          data: {},
        })
      );
    }
    return res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error: any) {
    console.log(error.message);
    return next(
      res.status(500).json({
        status: "error",
        message: "Error while getting the book",
        error: error.message,
      })
    );
  }
};
