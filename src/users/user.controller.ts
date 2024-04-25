//TODO:Visit https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses to check status code
import bcrypt from "bcrypt";
import { type NextFunction, type Request, type Response } from "express";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./user.model";
const { jwtSecrete } = config;
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, displayName, email, password: pass } = req.body;
    if (!username || !displayName || !email || !pass) {
      return res.status(403).json({
        success: false,
        status: 403,
        message: "Please provide all required fields",
      });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        status: 409,
        message: "Username or email already exists",
      });
    }

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(pass, 10);

    // Create new user
    let newUser = null;
    try {
      newUser = await User.create({
        username,
        displayName,
        email,
        password: hashedPassword,
      });
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }

    // Token generation
    const token = sign({ sub: newUser._id }, jwtSecrete, {
      expiresIn: "7d",
    });

    return next(
      res.status(201).json({
        message: "OK",
        accessToken: token,
        uid: newUser?._id,
      })
    );
  } catch (error: any) {
    console.log("Registration failed :: ", error.message);
    return next(
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Registration failed",
      })
    );
  }
};
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        status: 403,
        message: "Please provide all required fields",
      });
    }
    let user = null;
    try {
      user = await User.findOne({ email });
    } catch (error: any) {
      return res.status(error.statusCode || 400).json({
        success: false,
        statusCode: error.statusCode,
        message: error.message,
      });
    }
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    let isMatch = null;
    try {
      isMatch = await bcrypt.compare(password, user.password);
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    if (!isMatch) {
      return res.status(403).json({
        message: "Invalid credentials",
      });
    }
    const token = sign({ sub: user._id }, jwtSecrete, {
      expiresIn: "7d",
    });
    res.json({
      message: "OK",
      uid: user._id,
      email: user.email,
      name: user.displayName,
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
