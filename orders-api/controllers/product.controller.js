// Entities
import Product from "../db/product.db.js";
import { CREATED, INTERNAL_ERROR, SUCCESS } from "../enums/http-status.enum.js";
import { BODY, PARAMS, QUERY } from "../enums/sources.enum.js";

const findById = (req, res) => {
  const { id } = req[PARAMS];

  Product.findBy("id", id)
    .then((data) => {
      if (data.lenght === 0) return res.status(SUCCESS).json({});

      return res.status(SUCCESS).json({
        ...data[0],
      });
    })
    .catch((err) => {
      return res.status(INTERNAL_ERROR);
    });
};

const create = (req, res, next) => {
  const { sku, name, price_cents, stock } = req[BODY];

  return Product.insert(sku, name, price_cents, stock)
    .then((data) => {
      if (!data) return res.status(FORBIDDEN).json();

      return res.status(CREATED).json({ id: data.insertId });
    })
    .catch((err) => {
      return res.status(INTERNAL_ERROR);
    });
};

const put = (req, res, next) => {
  const { id } = req[PARAMS];

  const { price_cents, stock } = req[BODY];

  Product.update(id, price_cents, stock)
    .then((data) =>
      res.status(SUCCESS).json({
        affectedRows: data.affectedRows,
        info: data.info,
      })
    )
    .catch((err) => {
      return res.status(INTERNAL_ERROR);
    });
};

const search = (req, res, next) => {
  const { search, cursor, limit } = req[QUERY];

  return Product.search(search, cursor, limit)
    .then((result) => res.status(SUCCESS).json(result ? result : []))
    .catch((err) => {
      return res.status(INTERNAL_ERROR);
    });
};

export default {
  findById,
  create,
  put,
  search,
};
