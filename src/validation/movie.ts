import * as yup from "yup";

const movieCreateValidationSchema = yup.object({
  title: yup.string().required(),
  poster: yup.string().required(),
  year: yup.number().required(),
});

const movieEditValidationSchema = yup.object({
  title: yup.string().optional(),
  poster: yup.string().optional(),
  year: yup.number().optional(),
});

const movieGetValidationSchema = yup.object({
  limit: yup.number().optional(),
  page: yup.number().optional(),
});

export {
  movieCreateValidationSchema,
  movieGetValidationSchema,
  movieEditValidationSchema,
};
