import mongoose, { Document, Schema } from "mongoose";

export interface UserTypes extends Document {
  _id?: string;
  username: string;
  displayName: string;
  email: string;
  password: string;
  createdAT: Date;
}
const userSchema: Schema<UserTypes> = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
      match: [/^[a-z0-9_]{3,30}$/, "Username is not valid"],
    },
    displayName: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email address is not valid.",
      ],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      match: [
        /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/,
        "Password must contain numbers and special characters",
      ],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<UserTypes>("User", userSchema);
