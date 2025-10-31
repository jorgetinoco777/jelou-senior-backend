import { pool as db } from "./index.js";

const insert = async (orderId, productId, qty, unitPrice, subtotal) => {
  try {
    const [result] = await db.query(
      "INSERT INTO order_items (order_id, product_id, qty, unit_price_cents, subtotal_cents) VALUES (?, ?, ?, ?, ?)",
      [orderId, productId, qty, unitPrice, subtotal]
    );

    if (!result) return;

    return result;
  } catch (error) {
    console.log("Error: ", error);
    return;
  }
};

export default {
  insert,
};