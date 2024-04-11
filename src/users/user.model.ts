import mongoose, { Document, Schema } from "mongoose";

export interface UserTypes extends Document {
  _id?: string;
  username: string;
  email: string;
  password: string;
  createdAT: Date;
}
const userSchema: Schema<UserTypes> = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "please use valid adress.",
      ],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<UserTypes>("User", userSchema);
