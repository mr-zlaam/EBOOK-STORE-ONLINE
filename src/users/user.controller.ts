//TODO:Visit https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses to check status code
import { type NextFunction, type Request, type Response } from "express";
import createHttpError from "http-errors";
import { User } from "./user.model.ts";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config.ts";
const { jwtSecrete } = config;
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, displayName, email, password: pass } = req.body;
    if (!username || !displayName || !email || !pass) {
      throw createHttpError(400, "All fields are required");
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      throw createHttpError(400, "Username or email already exists");
    }

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(pass, 10);

    // Create new user
    const newUser = await User.create({
      username,
      displayName,
      email,
      password: hashedPassword,
    });

    // Token generation
    const token = sign({ sub: newUser._id }, jwtSecrete, {
      expiresIn: "7d",
    });

    res.status(201).json({
      accessToken: token,
      message: "User registered successfully",
    });
  } catch (error: any) {
    console.log("Registration failed :: ", error.message);
    return res.status(error.status || 500).json({
      message: error.message || "Registration failed",
    });
  }
};
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({
      message: "OK",
    });
  } catch (error: any) {
    console.log(error.message);
  }
};
export { createUser, loginUser };
