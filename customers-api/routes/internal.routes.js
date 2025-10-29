import { Router } from "express";

import { PARAMS } from "../enums/sources.js";
import { InternalCustomerRequestSchema } from "../schemas/customer.js";
import { validateSchema } from "../utils/validate.js";
import { findById } from "../services/customer-service.js";

const router = Router();

router.get(
  "/customers/:id",
  validateSchema(InternalCustomerRequestSchema, PARAMS),
  findById(PARAMS)
);

export default router;