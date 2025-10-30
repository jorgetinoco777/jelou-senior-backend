import { Router } from "express";

import { PARAMS } from "../enums/sources.js";
import { InternalCustomerRequestSchema } from "../schemas/customer.js";
import { validateSchema } from "../utils/validate.js";
import Customer from "../services/customer-service.js";
import { authJWT } from "../auth/index.js";

const router = Router();

router.get(
  "/customers/:id",
  validateSchema(InternalCustomerRequestSchema, PARAMS),
  authJWT,
  Customer.findBy(PARAMS)
);

export default router;
