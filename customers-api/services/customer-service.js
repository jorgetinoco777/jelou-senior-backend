import { BODY, PARAMS, QUERY } from "../enums/sources.js";
import * as Schema from "../schemas/customer.js";

export const create = (source) => {
  return (req, res, next) => {
    const { name, email, phone } = req[source];

    return res.status(200).json({
      name,
      email,
      phone,
      message: "Create customer success.",
    });
  };
};

export const findById = (source) => {
  return (req, res, next) => {
    const { id } = req[source];

    return res.status(200).json({
      message: `Find customer: ${id}`,
    });
  };
};

export const search = (source) => {
  return (req, res, next) => {
    const { search, cursor, limit } = req[source];

    return res.status(200).json({
      message: `Customer search: ${search}, ${cursor}, ${limit}`,
    });
  };
};

export const deleteCutomer = (source) => {
  return (req, res, next) => {
    const { id } = req[source];

    return res.status(200).json({
      message: `Delete customer: ${id}`,
    });
  };
};

export const put = (req, res, next) => {
  const { id } = req[PARAMS];

  const { name, phone } = req[BODY];
  console.log("data: ", {name, phone});

  return res.status(200).json({
    message: `Customer id: ${id}`,
  });
};
