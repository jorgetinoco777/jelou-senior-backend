import { Router } from "express";
import customersRoutes from "./customers.routes.js";
import internalRoutes from "./internal.routes.js";
import authRoutes from "./auth.routes.js";
import healthRoutes from "./health.routes.js";

const router = Router();

router.use("/customers", customersRoutes);

router.use("/internal", internalRoutes);

router.use("/auth", authRoutes);

router.use("/health", healthRoutes);

export default router;
