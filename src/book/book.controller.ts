import { type NextFunction, type Request, type Response } from "express";
import cloudinary from "../config/cloudinary";
import path from "node:path";
import createHttpError from "http-errors";
import { BookModel } from "./book.model";
import fs from "node:fs";
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
    console.log("ImageUploadResult:", ImageUploadResult);
    try {
      await fs.promises.unlink(filePath);
    } catch (error: any) {
      console.log(error.message);
    }
  } catch (error: any) {
    console.log(error.message);
    return createHttpError(500, "Error while uploading coverImage");
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
    console.log("BookFileUploadResult:", bookFileUploadResult);

    //Deleting temp files from public folder
    try {
      await fs.promises.unlink(bookFilePath);
    } catch (error: any) {
      console.log(error.message);
    }
  } catch (error: any) {
    console.log(error.message);
    return createHttpError(500, "Error while uploading Pdf files");
  }
  // Uploading data to the mongodb
  const newBook = await BookModel.create({
    title,
    genre,
    author: "66181855d7caa65abc40d4a0",
    coverImage: ImageUploadResult.secure_url,
    file: bookFileUploadResult.secure_url,
  });
  res.status(201).json({
    id: newBook._id,
    message: `File and CoverImage uploaded successfully`,
    pdfFile: bookFileUploadResult,
  });
  //@ts-ignore
  console.log(req.userId);
};
export { createBook };
