import { Router } from "express";
import AuthService from "../services/auth.service.js";
import { validateSchema } from "../utils/validate.js";
import { LoginRequestSchema } from "../schemas/auth.schema.js";
import { BODY } from "../enums/sources.js";

const router = Router();

router.post(
  "/login",
  validateSchema(LoginRequestSchema, BODY),
  AuthService.login
);

export default router;
