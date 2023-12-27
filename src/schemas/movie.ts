import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Movie = new Schema(
  {
    title: String,
    year: Number,
    poster: String,
  },
  { timestamps: true }
);

const movieModel = mongoose.model("movie", Movie);

export default movieModel;
