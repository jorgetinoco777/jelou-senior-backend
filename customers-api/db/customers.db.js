import { pool as db } from "./index.js";

const update = async (id, name, phone) => {
  const params = [];
  let items = "";
  if (name) {
    items = `name = ?`;
    params.push(name);
  }

  if (name && phone) items += ", ";

  if (phone) {
    items += `phone = ?`;
    params.push(phone);
  }

  params.push(id);

  const [result] = await db.query(
    `UPDATE customers SET ${items}  WHERE id = ?`,
    params
  );

  if (!result) return;

  return result;
};

const insert = async (email, name, phone) => {
  const [result] = await db.query(
    "INSERT INTO customers (email, name, phone) VALUES (?, ?, ?)",
    [email, name, phone]
  );

  if (!result) return;

  return result;
};

const findBy = async (property, value) => {
  const [customers] = await db.query(
    `SELECT id, email, name, phone FROM customers WHERE ${property} = ?`,
    [value]
  );

  if (customers.length === 0) return;

  return customers[0];
};

const search = async (search, cursor, limit) => {
  const offset = (cursor - 1) * limit;
  const query = `SELECT id, email, name, phone FROM customers WHERE email LIKE ? OR name LIKE ? ORDER BY id LIMIT ${limit} OFFSET ${offset};`;

  const [customers] = await db.query(query, [`%${search}%`, `%${search}%`]);

  return customers;
};

const remove = async (id) => {
  try {
    const [result] = await db.query(
      `UPDATE customers SET status = ? WHERE id = ?`,
      [0, id]
    );

    if (!result) return;

    return result;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export default {
  findBy,
  insert,
  search,
  update,
  remove,
};
