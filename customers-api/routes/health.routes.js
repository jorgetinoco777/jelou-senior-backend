import { Router } from "express";

const router = Router();

router.get("", (req, res) => {
  res.json({
    service: "customers-api",
    timestamp: new Date().toISOString(),
  });
});

export default router;
