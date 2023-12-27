import { Router } from "express";
import { loginController, registerController } from "../controllers/auth";
import validate from "../validation/validate";
import {
  loginValidationSchema,
  registerValidationSchema,
} from "../validation/auth";

export const AuthRoutes = Router();

AuthRoutes.post("/login", validate(loginValidationSchema), loginController);
AuthRoutes.post(
  "/register",
  validate(registerValidationSchema),
  registerController
);
