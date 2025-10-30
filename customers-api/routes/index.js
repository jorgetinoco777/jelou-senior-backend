import { Router } from "express";
import customersRoutes from "./customers.routes.js";
import internalRoutes from "./internal.routes.js";
import authRoutes from "./auth.routes.js";

const router = Router();

router.use("/customers", customersRoutes);

router.use("/internal", internalRoutes);

router.use("/auth", authRoutes);

export default router;
