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
  env: process.env.ENVIRONMENT, //Todo:change it during the production
  jwtSecrete: process.env.JWT_SECRET as string,
  cloud_name: process.env.CLOUD_NAME as string,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY as string,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET as string,
};
export const config = Object.freeze(_config);
