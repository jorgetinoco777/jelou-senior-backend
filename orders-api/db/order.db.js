import { pool as db } from "./index.js";

const findBy = async (property, value) => {
  const [orders] = await db.query(
    `SELECT id, customer_id, total_cents, created_at, status FROM orders WHERE ${property} = ?`,
    [value]
  );

  if (orders.length === 0) return [];

  return orders[0];
};

const insert = async (customer_id, total_cents) => {
  try {
    const [result] = await db.query(
      "INSERT INTO orders (customer_id, total_cents) VALUES (?, ?)",
      [customer_id, total_cents]
    );

    if (!result) return;

    return result;
  } catch (error) {
    console.log("Error: ", error);
    return;
  }
};

const search = async (from, to, cursor, limit) => {
  try {
    const offset = (cursor - 1) * limit;
    const query = `SELECT id, customer_id, total_cents, created_at, status FROM orders WHERE id BETWEEN ? AND ? ORDER BY id LIMIT ${limit} OFFSET ${offset};`;

    const [products] = await db.query(query, [from, to]);

    return products;
  } catch (err) {
    console.log("Error: ", err);
    return;
  }
};

const update = async (id, property, value) => {
  const [result] = await db.query(
    `UPDATE orders SET ${property} = ? WHERE id = ?;`,
    [value, id]
  );

  if (!result) return;

  return result;
};

export default {
  findBy,
  insert,
  search,
  update,
};
