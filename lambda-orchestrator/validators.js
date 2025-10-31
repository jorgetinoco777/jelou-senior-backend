const Joi = require("joi");

export const ProductsOrderSchema = Joi.object({
  id: Joi.number().int().positive(),
  qty: Joi.number().int().positive(),
});

export const OrchestratorSchema = Joi.object({
  customer_id: Joi.number().int().positive(),
  items: Joi.array(ProductsOrderSchema).min(1),
  idempotency_key: Joi.string().min(1),
  correlation_id: Joi.string().optional(),
});
