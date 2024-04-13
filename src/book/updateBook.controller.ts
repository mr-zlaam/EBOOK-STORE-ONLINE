// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!UpdateBookController!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import { type NextFunction, type Request, type Response } from "express";
import fs from "node:fs";
import { BookModel } from "./book.model";
import type { AuthRequest } from "../middlewares/authenticate";
import path from "node:path";
import cloudinary from "../config/cloudinary";
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
      const filePath = path.resolve(
        __dirname,
        "../../public/data/uploads/" + fileName
      );
      completeCoverImage = `${fileName}`;
      let uploadResult;
      try {
        uploadResult = await cloudinary.uploader.upload(filePath, {
          filename_override: completeCoverImage,
          folder: "book-covers",
          format: converMimeType,
        });
      } catch (error: any) {
        console.log(error.message);
      }
      completeCoverImage = uploadResult?.secure_url as string;
      try {
        await fs.promises.unlink(filePath);
        console.log("Book Cover deleted successfully after updating.");
      } catch (error: any) {
        console.log(error.message);
        return;
      }
    }
    let completeFileName = "";
    if (files.file) {
      const bookFileName = files.file[0].filename;
      const bookFilePath = path.resolve(
        __dirname,
        "../../public/data/uploads/" + bookFileName
      );
      completeFileName = bookFileName;
      const uploadResultPdf = await cloudinary.uploader.upload(bookFilePath, {
        resource_type: "raw",
        filename_override: completeFileName,
        folder: "book-pdfs",
        format: "pdf",
      });
      completeFileName = uploadResultPdf?.secure_url;
      try {
        await fs.promises.unlink(bookFilePath);
        console.log("Book file deleted successfully after updating.");
      } catch (error: any) {
        console.log(error.message);
        return;
      }
    }
    // Updating data in database
    let updateBook;
    try {
      updateBook = await BookModel.findOneAndUpdate(
        {
          _id: bookId,
        },
        {
          title: title,
          genre: genre,
          coverImage: completeCoverImage ? completeCoverImage : book.coverImage,
          file: completeFileName ? completeFileName : book.file,
        },
        { new: true }
      );
    } catch (error: any) {
      console.log(error.message);
      return;
    }
    return res.status(200).json(updateBook);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Error while updating the data",
    });
  }
};
