import { type NextFunction, type Request, type Response } from "express";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: "OK",
  });
};
export { createBook };
