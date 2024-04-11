//TODO:Visit https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses to check status code
import { type NextFunction, type Request, type Response } from "express";
import createHttpError from "http-errors";
import { User } from "./user.model.ts";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    const error = createHttpError(400, "All feilds are required");
    return next(error);
  }
  const user = await User.findOne({ email });
  if (user) {
    const error = createHttpError(400, "User Already exist with same email.");
    return next(error);
  }
  res.status(400).json({
    message: "User Registered Successfully",
  });
};
export { createUser };
