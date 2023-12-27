import { NextFunction, Request, Response } from "express";
import userModel from "../schemas/user";
import * as bcrypt from "bcrypt";
import { sendError } from "../utils/sendError";
import { AUTH } from "../utils/codes/auth";
import { sendSuccess } from "../utils/sendSuccess";
import * as jwt from "jsonwebtoken";

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("logging in...");
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email.toLowerCase() });
    if (!user)
      return sendError(res, AUTH.USER_NOT_FOUND, AUTH.USER_NOT_FOUND, 404);
    console.log("user found in db...", user);
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return sendError(
        res,
        AUTH.PASSWORD_INCORRECT,
        AUTH.PASSWORD_INCORRECT,
        404
      );
    const token = jwt.sign(
      { name: user.name, email: user.email },
      process.env.JWT_SECRET || "securePrivateKey",
      { expiresIn: 60 * 60 }
    );
    return sendSuccess(res, AUTH.LOGIN_SUCCESS, token, 200);
  } catch (error) {
    next(error);
  }
};

const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("registering...");
    const { email, password, name } = req.body;
    const user = await userModel.findOne({ email });
    if (user)
      return sendError(
        res,
        AUTH.USER_ALREADY_EXISTS,
        AUTH.USER_ALREADY_EXISTS,
        409
      );
    console.log("user not found in db...", user);

    const newUser = new userModel({ email, password, name });
    const createdUser = await newUser.save();

    return sendSuccess(res, AUTH.REGISTER_SUCCESS, createdUser, 201);
  } catch (error) {
    next(error);
  }
};

export { loginController, registerController };
