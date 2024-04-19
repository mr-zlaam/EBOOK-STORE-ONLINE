import dotenv from "dotenv";
import path from "node:path";
dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

// const _config = {
//   port: process.env.PORT || 3000,
//   connectionString: process.env.connectionstr || "",
//   env: process.env.ENVIRONMENT, //Todo:change it during the production
//   jwtSecrete: process.env.JWT_SECRET as string,
//   cloud_name: process.env.CLOUD_NAME as string,
//   cloudinary_api_key: process.env.CLOUDINARY_API_KEY as string,
//   cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET as string,
// };
const _config = {
  port: 5173,
  connectionString:
    "mongodb+srv://zlaam:hellozlaam@cluster0.3xjyjgy.mongodb.net/",
  jwtSecrete: "01BjyKhjU91Aft30cKLLtQMD9!ydB%rh5AWpT60D*%EDAk9/XZ2",
  cloud_name: "dd0zhxb3i",
  cloudinary_api_key: "999762955247549",
  cloudinary_api_secret: "jPutrFbm6L8YGxQWttgGL6j-3wI",
};

export const config = Object.freeze(_config);
