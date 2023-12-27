import { Router } from "express";
import validate from "../validation/validate";
import {
  movieCreateValidationSchema,
  movieEditValidationSchema,
  movieGetValidationSchema,
} from "../validation/movie";
import {
  createMoveController,
  editMovieController,
  getMovieController,
} from "../controllers/movie";
import authenticate from "../middlewares/authentication";

export const MovieRoutes = Router();

MovieRoutes.post(
  "/",
  authenticate,
  validate(movieCreateValidationSchema),
  createMoveController
);

MovieRoutes.get(
  "/",
  authenticate,
  validate(movieGetValidationSchema),
  getMovieController
);

MovieRoutes.put(
  "/:id",
  authenticate,
  validate(movieEditValidationSchema),
  editMovieController
);
