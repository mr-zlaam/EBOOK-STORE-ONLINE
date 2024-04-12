import { v2 as cloudinary } from "cloudinary";
import { config } from "./config";

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export default cloudinary;
