import { pool as db } from "./index.js";

const findById = async (id) => {
  const [orders] = await db.query(
    `SELECT target_type, target_id, status, response_body, created_at FROM idempotency_keys WHERE key_id = ?`,
    [id]
  );

  if (orders.length === 0) return;

  return orders[0];
};

const insert = async (id, target_type, target_id, status) => {
  try {
    const [result] = await db.query(
      "INSERT INTO idempotency_keys (key_id, target_type, target_id) VALUES (?, ?, ?)",
      [id, target_type, target_id]
    );

    if (!result) return;

    return result;
  } catch (error) {
    console.log("Error: ", error);
    return;
  }
};

const update = async (id, property, value) => {
  const [result] = await db.query(
    `UPDATE idempotency_keys SET ${property} = ? WHERE key_id = ?;`,
    [value, id]
  );

  if (!result) return;

  return result;
};

export default {
  findById,
  insert,
  update,
};
