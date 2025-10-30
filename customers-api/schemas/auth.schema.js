import Joi from "joi";

export const LoginRequestSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(32).required(),
});
