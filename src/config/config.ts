import dotenv from "dotenv";
import path from "path";
import { dirname } from "path";
const __dirname = dirname;
dotenv.config({
  path: path.resolve(`${__dirname} ../../.env`),
});

const _config = {
  port: process.env.PORT || 3000,
  connectionString: process.env.connectionstr || "",
};
export const config = Object.freeze(_config);
