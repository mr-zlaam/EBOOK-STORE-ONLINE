import { type NextFunction, type Request, type Response } from "express";
import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";
import { config } from "../config/config";
export interface AuthRequest extends Request {
  userId: string;
}
const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Authorization token is required",
    });
  try {
    const parsedToken = token.split(" ")[1];
    const decoded = verify(parsedToken, config.jwtSecrete);
    if (!decoded) return next(createHttpError(401, "Invalid token"));
    const _req = req as AuthRequest;
    console.log("decoded", decoded);
    _req.userId = decoded.sub as string;
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "token is expired",
    });
  }

  next();
};
export default authenticate;
