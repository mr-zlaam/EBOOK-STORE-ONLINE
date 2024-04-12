import { type NextFunction, type Request, type Response } from "express";
import cloudinary from "../config/cloudinary";
import path from "node:path";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
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
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({
      message: "Error uploading cover image",
      data: null,
    });
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
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({
      message: "Error uploading book file",
      data: null,
    });
  }
  res.status(200).json({
    message: "OK",
    coverImage: ImageUploadResult,
    pdfFile: bookFileUploadResult,
  });
};
export { createBook };
