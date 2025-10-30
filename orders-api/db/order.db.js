import { pool as db } from "./index.js";

const findBy = async (property, value) => {
  const [customers] = await db.query(
    `SELECT id, email, name, phone FROM customers WHERE ${property} = ?`,
    [value]
  );

  if (customers.length === 0) return;

  return customers[0];
};

export default {
  findBy,
};
