import type { NextFunction, Request, Response } from "express";
import { User } from "./user.model";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.find().select("-password");
    return next(
      res.status(200).json({
        success: true,
        data: user,
      })
    );
  } catch (error: any) {
    console.log(error.message);
    return next(
      res.status(500).json({
        success: false,
        error: error.message || "Internal server error",
      })
    );
  }
};
export { getAllUsers };
