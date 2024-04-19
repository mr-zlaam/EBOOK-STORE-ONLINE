import mongoose from "mongoose";
import { config } from "./config";
const connectDB = async (): Promise<void> => {
  try {
    mongoose.connection.on("connected", () => {
      console.log(`
                  *************************************************
                          Database connected successfully!!
                  *************************************************
    `);
    });
    mongoose.connection.on("error", (err) => {
      console.log("Error while connecting to the database", err);
    });
    await mongoose.connect(config.connectionString);
  } catch (error: any) {
    console.log(`Error While connecting to the database::${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
