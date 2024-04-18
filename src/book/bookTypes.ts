import type { Document } from "mongoose";
import type { UserTypes } from "../users/user.model";

export interface Book extends Document {
  _id: string;
  title: string;
  author: UserTypes;
  bookAuthor: string;
  genre: string;
  coverImage: string;
  file: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
