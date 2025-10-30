// Entities
import Order from "../db/order.db.js";
import { CREATED, INTERNAL_ERROR, SUCCESS } from "../enums/http-status.enum.js";
import { BODY, PARAMS, QUERY } from "../enums/sources.enum.js";

const findById = (req, res) => {
  const { id } = req[PARAMS];

  Order.findBy("id", id)
    .then((data) => {
      if (!data) return res.status(SUCCESS).json({});

      return res.status(SUCCESS).json({
        ...data,
      });
    })
    .catch((err) => {
      return res.status(INTERNAL_ERROR);
    });
};

const create = (req, res, next) => {
  const { customer_id, total_cents } = req[BODY];

  return Order.insert(customer_id, total_cents)
    .then((data) => {
      if (!data) return res.status(FORBIDDEN).json();

      return res.status(CREATED).json({ id: data.insertId });
    })
    .catch((err) => {
      return res.status(INTERNAL_ERROR);
    });
};

const search = (req, res, next) => {
  const { from, to, cursor, limit } = req[QUERY];

  return Order.search(from, to, cursor, limit)
    .then((result) => res.status(SUCCESS).json(result ? result : []))
    .catch((err) => {
      return res.status(INTERNAL_ERROR);
    });
};

const updateOrderState = (status) => (req, res, next) => {
  const { id } = req[PARAMS];

  return Order.update(id, "status", status)
    .then((result) => res.status(SUCCESS).json(result ? result : []))
    .catch((err) => {
      return res.status(INTERNAL_ERROR);
    });
};

export default {
  findById,
  create,
  search,
  updateOrderState,
};
