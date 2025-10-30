import { BODY, PARAMS } from "../enums/sources.js";
import {
  CREATED,
  FORBIDDEN,
  INTERNAL_ERROR,
  NO_CONTENT,
  SUCCESS,
} from "../enums/http-status.js";

// Entities
import Customer from "../db/customers.db.js";

const create = (source) => (req, res, next) => {
  const { name, email, phone } = req[source];

  return Customer.findBy("email", email)
    .then(async (data) => {
      if (data) return res.status(FORBIDDEN).json();

      const result = await Customer.insert(email, name, phone);

      return res.status(CREATED).json({ id: result.insertId });
    })
    .catch((err) => {
      return res.status(INTERNAL_ERROR);
    });
};

const findBy = (source) => (req, res) => {
  const { id } = req[source];

  Customer.findBy("id", id)
    .then((data) => {
      if (!data) return res.status(NO_CONTENT).json();

      return res.status(SUCCESS).json({
        ...data,
      });
    })
    .catch((err) => {
      return res.status(INTERNAL_ERROR);
    });
};

const search = (source) => (req, res, next) => {
  const { search, cursor, limit } = req[source];

  return Customer.search(search, cursor, limit)
    .then((result) => res.status(SUCCESS).json(result ? result : []))
    .catch((err) => {
      return res.status(INTERNAL_ERROR);
    });
};

const remove = (source) => (req, res, next) => {
  const { id } = req[source];

  return Customer.remove(id)
    .then((data) => {
      return res.status(SUCCESS).json({
        id,
        message: `Customer delete successfully.`,
      });
    })
    .catch((err) => {
      return res.status(INTERNAL_ERROR);
    });
};

const put = (req, res, next) => {
  const { id } = req[PARAMS];

  const { name, phone } = req[BODY];

  Customer.update(id, name, phone)
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

export default {
  create,
  findBy,
  search,
  remove,
  put,
};
