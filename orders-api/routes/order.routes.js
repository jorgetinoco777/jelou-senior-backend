import { Router } from "express";
import { BODY, PARAMS, QUERY } from "../enums/sources.enum.js";

// Controllers
import OrderController from "../controllers/order.controller.js";

const router = Router();

// Create
router.post("", OrderController.create);

// Find by id
router.get("/:id", OrderController.findById);

// Search
router.get("", OrderController.search);

// Order confirm
router.post("/:id/confirm", OrderController.updateOrderState("CONFIRMED"));

// Order cancel
router.post("/:id/cancel",  OrderController.updateOrderState("CANCELED"));

export default router;
