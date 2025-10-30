import { Router } from "express";
import { BODY, PARAMS, QUERY } from "../enums/sources.enum.js";

const router = Router();

// Create
router.post("", (req, res, next) => {
  const data = req[BODY];

  return res.status(200).json({
    ...data,
  });
});

// Find by id
router.get("/:id", (req, res, next) => {
  const { id } = req[PARAMS];

  return res.status(200).json({
    message: `Order: ${id}`,
  });
});

// Search
router.get("", (req, res, next) => {
  const { from, to, cursor, limit, status } = req[QUERY];

  return res.status(200).json({
    message: `Search order: ${from}, ${to}, ${cursor}, ${limit}, ${status}`,
  });
});

// Order confirm
router.post("/:id/confirm", (req, res, next) => {
  const { id } = req[PARAMS];

  return res.status(200).json({
    message: `confirm order: ${id}`,
  });
});

// Order cancel
router.post("/:id/cancel", (req, res, next) => {
  const { id } = req[PARAMS];

  return res.status(200).json({
    message: `Cancel order: ${id}`,
  });
});

export default router;
