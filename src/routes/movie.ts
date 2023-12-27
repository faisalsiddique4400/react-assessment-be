import { Router } from "express";
import { validate, validateQueryParam } from "../validation/validate";
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
  validateQueryParam(movieGetValidationSchema),
  getMovieController
);

MovieRoutes.put(
  "/:id",
  authenticate,
  validate(movieEditValidationSchema),
  editMovieController
);
