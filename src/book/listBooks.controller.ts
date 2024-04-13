//!!!!!!!!!!!!!!!!!!!!!!!!!Get Request
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//  WARNING:- search parameter is not working we'll fix it later.
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

import { type Request, type Response, type NextFunction } from "express";
import { BookModel } from "./book.model";

export const listBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;

    const limit = parseInt(req.query.limit as string) || 10;

    const searchQuery = (req.query.search as string) || "";

    const startIndex = (page - 1) * limit;

    const searchCondition = searchQuery
      ? { $text: { $search: searchQuery } }
      : {};

    const books = await BookModel.find(searchCondition)
      .skip(startIndex)
      .limit(limit);

    const totalBooks = await BookModel.countDocuments(searchCondition);
    return res.json({
      success: true,
      message: "OK",
      data: {
        books,
        currentPage: page,
        totalPages: Math.ceil(totalBooks / limit),
        totalBooks,
      },
    });
  } catch (error: any) {
    console.log(error.message);
    return next(
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );
  }
};
