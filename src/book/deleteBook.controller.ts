import { type Request, type Response, type NextFunction } from "express";
import { BookModel } from "./book.model.ts";
import type { AuthRequest } from "../middlewares/authenticate.ts";
import cloudinary from "../config/cloudinary.ts";

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { bookId } = req.params;

  try {
    const book = await BookModel.findOne({ _id: bookId });
    const _req = req as AuthRequest;
    if (book?.author.toString() !== _req.userId) {
      return next(
        res.status(403).json({
          success: false,
          message: "unauthorized User",
        })
      );
    }
    const coverFilesSplit = book?.coverImage.split("/");
    const coverImagePublicId =
      coverFilesSplit.at(-2) + "/" + coverFilesSplit.at(-1)?.split(".").at(-2);
    const bookFilesSplit = book?.file.split("/");
    const bookFilePublicId =
      bookFilesSplit.at(-2) + "/" + bookFilesSplit.at(-1);
    console.log(coverImagePublicId);
    console.log(bookFilePublicId);
    try {
      await cloudinary.uploader.destroy(coverImagePublicId);
      await cloudinary.uploader.destroy(bookFilePublicId, {
        resource_type: "raw",
      });
      console.log("coverImage and pdf file delted successfully");
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).json({
        success: false,
        message: "Error while deleting the book from cloudinary",
        error: error.message,
      });
    }
    if (!book) {
      return next(
        res.status(400).json({
          success: false,
          message: "Book not found",
        })
      );
    }
    try {
      await BookModel.deleteOne({ _id: bookId });
    } catch (error: any) {
      console.log(error.message);
      return next(
        res.status(500).json({
          error: "Something went wrong while deleting",
        })
      );
    }
    return next(
      res.status(204).json({
        success: true,
        message: "Book deleted successfully",
        data: null,
      })
    );
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
