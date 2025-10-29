import { BAD_REQUEST } from "../enums/http-status.js";

export const validateSchema = (schema, source = 'body') => {
  return (req, res, next) => {

    const { error } = schema.validate(req[source]);

    if (error)
      return res.status(BAD_REQUEST).json({
        message: error.message,
      });

    next();
  };
};
