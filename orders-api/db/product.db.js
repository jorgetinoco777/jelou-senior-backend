import { pool as db } from "./index.js";

const findBy = async (property, value) => {
  const [products] = await db.query(
    `SELECT id, sku, name, price_cents, stock, created_at FROM products WHERE ${property} = ?`,
    [value]
  );

  if (products.length === 0) return [];

  return products;
};

const insert = async (sku, name, price_cents, stock) => {
  try {
    const [result] = await db.query(
      "INSERT INTO products (sku, name, price_cents, stock) VALUES (?, ?, ?, ?)",
      [sku, name, price_cents, stock]
    );

    if (!result) return;

    return result;
  } catch (error) {
    console.log("Error: ", error);
    return;
  }
};

const update = async (id, price_cents, stock) => {
  const params = [];
  let items = "";
  if (price_cents) {
    items = `price_cents = ?`;
    params.push(price_cents);
  }

  if (price_cents && stock) items += ", ";

  if (stock) {
    items += `stock = ?`;
    params.push(stock);
  }

  params.push(id);

  const [result] = await db.query(
    `UPDATE products SET ${items} WHERE id = ?`,
    params
  );

  if (!result) return;

  return result;
};

const search = async (search, cursor, limit) => {
  try {
    const offset = (cursor - 1) * limit;
    const query = `SELECT id, sku, name, price_cents, stock, created_at FROM products WHERE name LIKE ? ORDER BY id LIMIT ${limit} OFFSET ${offset};`;

    const [products] = await db.query(query, [`%${search}%`]);

    return products;
  } catch (err) {
    console.log("Error: ", err);
    return;
  }
};

export default {
  findBy,
  insert,
  update,
  search,
};
