import path from "path";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import { NextFunction, Request, Response, Router } from "express";
import authenticate from "../middlewares/authentication";
import fs from "fs";
import { sendSuccess } from "../utils/sendSuccess";
import { MOVIE } from "../utils/codes/movie";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadFolder = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });

export const UploadRouter = Router();

UploadRouter.post(
  "/",
  authenticate,
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.file.path);
    return sendSuccess(
      res,
      MOVIE.FILE_UPLOAD_SUCCESS,
      { path: req.file.filename },
      200
    );
  }
);
