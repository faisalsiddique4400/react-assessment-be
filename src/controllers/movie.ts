import { NextFunction, Request, Response } from "express";
import movieModel from "../schemas/movie";
import { sendSuccess } from "../utils/sendSuccess";
import { MOVIE } from "../utils/codes/movie";
import { sendError } from "../utils/sendError";

const createMoveController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("creating movie...");
    const { poster, year, title } = req.body;
    const movie = new movieModel({ poster, year, title });
    const newMovie = await movie.save();
    return sendSuccess(res, MOVIE.CREATE_SUCCESSFULL, newMovie, 201);
  } catch (error) {
    next(error);
  }
};

const getMovieController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit = "10", page = "1" } = req.query;
    const skipCount = (Number(page) - 1) * Number(limit);

    const movies = await movieModel.find().skip(skipCount).limit(Number(limit));
    const count = await movieModel.countDocuments();

    return sendSuccess(
      res,
      MOVIE.MOVIES_FETCH_SUCCESS,
      { movies, total: count },
      200
    );
  } catch (error) {
    next(error);
  }
};

const editMovieController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const movie = await movieModel.findById(id);
    if (!movie)
      return sendError(res, MOVIE.MOVIE_NOT_FOUND, MOVIE.MOVIE_NOT_FOUND, 404);
    movie.set({ ...req.body });
    const newMovie = await movie.save();
    return sendSuccess(res, MOVIE.MOVIE_UPDATED, newMovie, 200);
  } catch (error) {
    next(error);
  }
};

export { createMoveController, getMovieController, editMovieController };
