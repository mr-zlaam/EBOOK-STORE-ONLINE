import mongoose, { Document, Schema } from "mongoose";
import type { Book } from "./bookTypes";

const bookSchema = new Schema<Book>(
  {
    title: {
      type: String,
      required: [true, "Book Title is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author's name is required"],
    },
    coverImage: {
      type: String,
      required: [true, "coverImage is required"],
    },
    file: {
      type: String,
      required: [true, "Book file is required"],
    },
    genre: {
      type: String,
      required: [true, "Genere is required"],
    },
    bookAuthor: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [1000, "Description must be at most 1000 characters"],
    },
  },
  { timestamps: true }
);
export const BookModel = mongoose.model<Book>("Book", bookSchema);
