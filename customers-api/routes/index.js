import { Router } from "express";
import customersRoutes from "./customers.routes.js";
import internalRoutes from "./internal.routes.js";

const router = Router();

router.use(
  "/customers",
  customersRoutes
);

router.use(
  "/internal",
  internalRoutes
);

export default router;
