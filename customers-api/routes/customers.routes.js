import { Router } from "express";
import { create, deleteCutomer, findById, put, search } from "../services/customer-service.js";
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
  findById(PARAMS)
);

router.post("", validateSchema(CreateRequestSchema, BODY), create(BODY));

router.get("", validateSchema(SearchRequestSchema, QUERY), search(QUERY));


router.delete(
  "/:id",
  validateSchema(DeleteRequestSchema, PARAMS),
  deleteCutomer(PARAMS)
);

router.put("/:id", validateSchema(UpdateRequestSchema, PARAMS), put);

export default router;
