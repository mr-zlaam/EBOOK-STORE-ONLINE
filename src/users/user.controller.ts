import { type NextFunction, type Request, type Response } from "express";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  console.log(data);
  res.status(400).json({
    message: "User Registered Successfully",
  });
};
export { createUser };
