// Entities
import Order from "../db/order.db.js";
import OrderItem from "../db/order_item.db.js";
import Product from "../db/product.db.js";
import { CREATED, INTERNAL_ERROR, SUCCESS } from "../enums/http-status.enum.js";
import { BODY, PARAMS, QUERY } from "../enums/sources.enum.js";

const findById = async (req, res) => {
  const { id } = req[PARAMS];

  Order.findBy("id", id)
    .then((data) => {
      if (!data) return res.status(SUCCESS).json({});

      return res.status(SUCCESS).json({
        ...data,
      });
    })
    .catch((err) => {
      return res.status(INTERNAL_ERROR).json();
    });
};

const create = async (req, res, next) => {
  try {
    const { customer_id, items } = req[BODY];

    let total_cents = 0;
    const products = [];
    const products_detail = [];

    await items.map(async (item) => {
      // 1. get products
      const [productSelected] = await Product.findBy("id", item.product_id);

      // 2. calculate total
      const total = Number(productSelected.price_cents) * item.qty;
      total_cents += total;

      products.push({
        id: productSelected.id,
        qty: item.qty,
        unit_price: productSelected.price_cents,
        subtotal: total,
        stock: productSelected.stock - item.qty,
      });

      products_detail.push({
        id: productSelected.id,
        qty: item.qty,
        unit_price: Number(productSelected.price_cents),
        subtotal: total,
      });
    });

    // 3. create order
    const { insertId: orderId } = await Order.insert(customer_id, total_cents);

    await products.map(async (product) => {
      // 4. save product detail
      await OrderItem.insert(
        orderId,
        product.id,
        product.qty,
        product.unit_price,
        product.subtotal
      );

      // 5. update stock
      await Product.update(product.id, undefined, product.stock);
    });

    // 6. build response
    return res
      .status(CREATED)
      .json({ id: orderId, total: total_cents, items: products_detail });
  } catch (err) {
    return res.status(INTERNAL_ERROR).json({
      message: err,
    });
  }
};

const search = (req, res, next) => {
  const { from, to, cursor, limit } = req[QUERY];

  return Order.search(from, to, cursor, limit)
    .then((result) => res.status(SUCCESS).json(result ? result : []))
    .catch((err) => {
      return res.status(INTERNAL_ERROR).json();
    });
};

const updateOrderState = (status) => (req, res, next) => {
  const { id } = req[PARAMS];

  return Order.update(id, "status", status)
    .then((result) => res.status(SUCCESS).json(result ? result : []))
    .catch((err) => {
      return res.status(INTERNAL_ERROR).json();
    });
};

export default {
  findById,
  create,
  search,
  updateOrderState,
};
