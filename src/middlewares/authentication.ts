import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { sendError } from "../utils/sendError";
import { AUTH } from "../utils/codes/auth";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return sendError(
      res,
      AUTH.AUTHENTICATION_ERROR,
      AUTH.AUTHENTICATION_ERROR,
      401
    );
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "securePrivateKey"
    );

    (req as any).user = decoded;

    next();
  } catch (error) {
    return sendError(res, (error as Error).stack, AUTH.INVALID_TOKEN, 401);
  }
};

export default authenticate;
