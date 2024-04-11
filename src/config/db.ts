import mongoose from "mongoose";
import { config } from "./config.ts";
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.connectionString);
  } catch (error: any) {
    console.log(`Error While connecting to the database::${error.message}`);
    process.exit();
  }
};
export default connectDB;
