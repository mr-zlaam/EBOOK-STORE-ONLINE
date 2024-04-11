//TODO:Visit https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses to check status code
import { type NextFunction, type Request, type Response } from "express";
import createHttpError from "http-errors";
import { User } from "./user.model.ts";
import bcrypt from "bcrypt";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
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
    res.status(200).json({
      message: "User Registered Successfully",
    });
    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
  } catch (error: any) {
    console.log("Registeration failed :: ", error.message);
    throw new Error("Registeration failed::something went wrong");
  }
};
export { createUser };
