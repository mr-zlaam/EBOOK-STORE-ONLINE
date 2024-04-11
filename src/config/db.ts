import mongoose from "mongoose";
import { config } from "./config";
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.connectionString);
  } catch (error: any) {
    console.log(`Error While connecting to the database::${error.message}`);
  }
};
export default connectDB;
