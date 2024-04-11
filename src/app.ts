import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import type { HttpError } from "http-errors";
import { config } from "./config/config.ts";
const app = express();
app.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  const statuscode = err.statusCode || 500;
  return res.status(statuscode).json({
    message: err.message,
    errorStack: config.env == "dev" ? err.stack : "",
  });
});
export default app;
