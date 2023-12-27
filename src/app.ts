import express, { NextFunction, Request, Response } from "express";
import { AuthRoutes } from "./routes/auth";
import mongoose from "mongoose";
import cors from "cors";
import { MovieRoutes } from "./routes/movie";
import { UploadRouter } from "./routes/upload";
import dotenv from "dotenv";
import path from "path";
import { sendError } from "./utils/sendError";

dotenv.config({
  path:
    process.env.NODE_ENV === "development"
      ? path.join(process.cwd(), ".env.example")
      : path.join(process.cwd(), ".env"),
});
const app = express();
const port = process.env.PORT || 3000;

process.env.NODE_ENV === "development" && mongoose.set("debug", true);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/uploads", express.static("uploads"));
app.use("/api/auth", AuthRoutes);
app.use("/api/movie", MovieRoutes);
app.use("/api/upload", UploadRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  return sendError(
    res,
    "Not found, check your URL please!",
    "Not found, check your URL please!",
    404
  );
});

app.use((error: Error, _req: Request, res: Response) => {
  return sendError(res, error.stack, error.message, 500);
});

mongoose
  .connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/test")
  .then(() => {
    app.listen(port, () => {
      return console.log(`Express is listening at http://localhost:${port}`);
    });
  });
