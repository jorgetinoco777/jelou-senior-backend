import { Router } from "express";
import { BODY, PARAMS, QUERY } from "../enums/sources.enum.js";

// Controllers
import ProductController from "../controllers/product.controller.js";

const router = Router();

// Create
router.post("", ProductController.create);

// Update
router.patch("/:id", ProductController.put);

// Find
router.get("/:id", ProductController.findById);

// Search
router.get("", ProductController.search);

export default router;
