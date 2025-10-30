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

// Update
router.patch("/:id", (req, res, next) => {
  const {id} = req[PARAMS];
  const data = req[BODY];

  return res.status(200).json({
    id,
    ...data,
  });
});

// Find
router.get("/:id", (req, res, next) => {
     const {id} = req[PARAMS];
  return res.status(200).json({
    message: `Product: ${id}`,
  });
});

// Search
router.get("", (req, res, next) => {
  const { search, cursor, limit } = req[QUERY];

  return res.status(200).json({
    message: `Product search: ${search}, ${cursor}, ${limit}`,
  });
});

export default router;
