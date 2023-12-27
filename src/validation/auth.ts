import * as yup from "yup";

const loginValidationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const registerValidationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
  name: yup.string().required(),
});

export { loginValidationSchema, registerValidationSchema };
