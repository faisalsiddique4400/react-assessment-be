import { NextFunction, Request, Response } from "express";

const validate =
  (schema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        ...req.body,
      });
      return next();
    } catch (err) {
      console.log(err);
      res.status(400).send(err.message);
    }
  };

export default validate;
