import { Router } from "express";

const router = Router();

router.get("", (req, res) => {
  res.json({
    service: "orders-api",
    timestamp: new Date().toISOString(),
  });
});

export default router;
