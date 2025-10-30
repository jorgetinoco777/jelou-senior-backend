import Joi from "joi";

export const FindIdRequestSchema = Joi.object({
  id: Joi.number().required(),
});

export const CreateRequestSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

export const SearchRequestSchema = Joi.object({
  search: Joi.string().required(),
  cursor: Joi.number().min(1).required(),
  limit: Joi.number().required(),
});

export const UpdateRequestSchema = Joi.object({
  id: Joi.number().required(),
});

export const DeleteRequestSchema = Joi.object({
  id: Joi.number().required(),
});

export const InternalCustomerRequestSchema = Joi.object({
  id: Joi.number().required(),
});
