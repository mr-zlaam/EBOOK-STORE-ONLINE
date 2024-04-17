//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Create Book controller !!!!!!!!!!!!!!1
import { type NextFunction, type Request, type Response } from "express";
import fs from "node:fs";
import path from "node:path";
import cloudinary from "../config/cloudinary";
import type { AuthRequest } from "../middlewares/authenticate";
import { BookModel } from "./book.model";
const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, genre } = req.body;
  //*************************************************** */
  //CoverImage Upload
  let ImageUploadResult;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  try {
    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);

    const fileName = files.coverImage[0].filename;

    const filePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      fileName
    );

    ImageUploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: fileName,
      folder: "book-covers",
      format: coverImageMimeType,
    });
    try {
      await fs.promises.unlink(filePath);
      console.log("Book Cover deleted successfully after uploading.");
    } catch (error: any) {
      console.log(error.message);
      return next(
        res.status(500).json({
          error: "Something went wrong while uploading",
        })
      );
    }
  } catch (error: any) {
    console.log(error.message);
    return next(
      res.status(500).json({
        error: "Error while uploading.",
      })
    );
  }

  // **************************************************************************
  //PDF upload on cloudinary
  let bookFileUploadResult;
  try {
    const bookFileName = files.file[0].filename;

    const bookFilePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      bookFileName
    );
    bookFileUploadResult = await cloudinary.uploader.upload(bookFilePath, {
      resource_type: "raw",
      filename_override: bookFileName,
      folder: "book-pdfs",
      format: "pdf",
    });

    //Deleting temp files from public folder
    try {
      await fs.promises.unlink(bookFilePath);
      console.log("BookFile deleted successfully after uploading");
    } catch (error: any) {
      return next(
        res.status(500).json({
          error: "Something went wrong while uploading",
        })
      );
    }
  } catch (error: any) {
    console.log(error.message);
    return next(
      res.status(500).json({
        error: "Something went wrong while uploading uploading pdfs",
      })
    );
  }
  // Uploading data to the mongodb
  const _req = req as AuthRequest;

  const newBook = await BookModel.create({
    title,
    genre,
    author: _req.userId,
    coverImage: ImageUploadResult.secure_url,
    file: bookFileUploadResult.secure_url,
  });
  res.status(201).json({
    success: true,
    statusCode: 201,
    data: {
      id: newBook._id,
      title: newBook.title,
      genre: newBook.genre,
      author: newBook.author,
      coverImage: newBook.coverImage,
      file: newBook.file,
      message: `File and CoverImage uploaded successfully`,
    },
  });
};
export { createBook };
