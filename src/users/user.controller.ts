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
      message: "OK",
      accessToken: token,
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
    const { email, password } = req.body;
    if (!email || !password) {
      throw createHttpError(400, "This field is required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError(404, "User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw createHttpError(400, "Invalid credentials");
    }
    const token = sign({ sub: user._id }, jwtSecrete, {
      expiresIn: "7d",
    });
    res.json({
      message: "OK",
      accessToken: token,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(error.status || 500).json({
      message: error.message || "Login failed",
    });
  }
};
export { createUser, loginUser };
