import { Router } from "express";
import CustomerService from "../services/customer-service.js";
import { BODY, PARAMS, QUERY } from "../enums/sources.js";
import { validateSchema } from "../utils/validate.js";
import {
  CreateRequestSchema,
  DeleteRequestSchema,
  FindIdRequestSchema,
  SearchRequestSchema,
  UpdateRequestSchema,
} from "../schemas/customer.js";

const router = Router();

router.get(
  "/:id",
  validateSchema(FindIdRequestSchema, PARAMS),
  CustomerService.findBy(PARAMS)
);

router.post(
  "",
  validateSchema(CreateRequestSchema, BODY),
  CustomerService.create(BODY)
);

router.get(
  "",
  validateSchema(SearchRequestSchema, QUERY),
  CustomerService.search(QUERY)
);

router.delete(
  "/:id",
  validateSchema(DeleteRequestSchema, PARAMS),
  CustomerService.remove(PARAMS)
);

router.put(
  "/:id",
  validateSchema(UpdateRequestSchema, PARAMS),
  CustomerService.put
);

export default router;
